const JWT = require('jsonwebtoken');
const {validateuser , User} = require('../models/user');
const { JWT_SECRET, EMAIL } = require('../configuration/index');
const bcrypt = require('bcrypt');
const ApiError = require("../errors/api-error");
const { sendEmail } = require('./email');
const https = require('https');
const querystring = require('querystring');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const LINKEDIN_CLIENT_ID = "77oj8s50xw1yt7";
const LINKEDIN_CLIENT_SECRET = "W8tanXzQrWJpjH6y";
const axios = require('axios');


signToken = user => {
    return JWT.sign({
        iss: 'NameOfProject',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1 )
    }, JWT_SECRET );
};


module.exports = {
    signUp : async (req,res,next) => {
        const { error } = validateuser(req.body);
        if (error) return next(ApiError.BadRequest(error.details[0].message));
      
        const { name,email,password } = req.body;
      
        let finduser = await User.findOne({ "local.email": email });
        if (finduser) return next(ApiError.BadRequest('Email is already in use'));

        finduser = await User.find({
            $or: [
              { "google.email": email },
              { "facebook.email": email },
            ]
          }).limit(1);
          finduser = finduser[0];
          if (finduser) {
            // Let's merge them?
            finduser.methods.push('local')
            finduser.local = {
              name: name,
              email: email,
              password: password.trim(),
              verified: true
            }
            await finduser.save()
            // Generate the token
            const token = signToken(finduser);
            // Respond with token
            res.cookie('access_token', token, {
              httpOnly: true
            });
            res.status(200).json({ token, portfolioIds: finduser.portfolioID });
        }


        const newuser = new User({
            methods: ['local'],
            local: {
                name: name,
                email: email,
                password: password.trim()
            },
        });
        await newuser.save();
        const token = signToken(newuser);

        // send mail of verification 
        var emailError = sendEmail(
            EMAIL.USER, email, 'Account Verification',
            `Hello ${name},\n\nPlease verify your account by clicking the link: \n localhost:8000/user/confirmation/${token}\n\nThank You!\n`
        )
        // TODO: handle email failure correctly, this always returns undefined:
        if (emailError)
            return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});

        res.cookie('access_token', token, {
            httpOnly: true
        });
        return res.status(200).json({ token, name, email });
    },

    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });

        res.status(200).json({ token, portfolioId: req.user.portfolioID, verified: req.user.local.verified });
    },

    confirmEmail: async(req, res, next) => {
        try {
            const token = req.params.token;
            const payload = JWT.verify(token, JWT_SECRET);
            const user = await User.findById(payload.sub);
            if (!user) {
                return next(ApiError.Unauthorized('You don\'t have an account'));
            }

            user.local.verified = true;
            await user.save();

            res.status(200).json({message: "successful confirmation!"});
        } catch(err) {
            return next(ApiError.BadRequest('Your verification link may have expired. Please click on resend for verify your Email.'));
        }      
    },

    resend: async(req, res, next) => {
        const token = req.params.token;
        const payload = JWT.verify(token, JWT_SECRET);
        const user = await User.findById(payload.sub);
        if (!user) {
            return next(ApiError.Unauthorized('You don\'t have an account'));
        }
        else if (user.local.verified){
            return res.status(200).send('This account has been already verified. Please log in.');
    
        }
        else{
            // send mail of verification 
            var emailError = sendEmail(
                EMAIL.USER, user.local.email, 'Account Verification',
                `Hello ${user.local.name},\n\nPlease verify your account by clicking the link: \n localhost:8000/user/confirmation/${token}\n\nThank You!\n`
            );
            // TODO: handle email failure correctly, this always returns undefined:
            if (emailError)
                return res.status(500).json({msg:'Technical Issue!, Please click on resend for verify your Email.'});
        }
    },

    loginWithLinkedin: async (req, res, next) => {
        // get the token from frontend
        const {token} = req.body

        // get an access token from linkedin API
        const result = await axios
            .post("https://www.linkedin.com/oauth/v2/accessToken", querystring.stringify({
                grant_type: "authorization_code",
                code: token,
                redirect_uri: 'http://localhost:4200/register/linkedin-verif',
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET
            }));
        const accessToken = result.data.access_token;

        // get the user's email address
        const emailRequest = await axios
            .get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=' + accessToken);
        const email = emailRequest.data.elements[0]['handle~'].emailAddress;

        //check if the user already exists or not
        let user = await User.findOne({ email });

        // if the user exists, we check whether he signed up with linkedin or not
        if(user) {
            // if not with linkedin, we update the user's information
            if(user.methods.indexOf('linkedin') === -1) {
                // get user profile with the access token
                const profile = await axios
                    .get('https://api.linkedin.com/v2/me',
                        { headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'cache-control': 'no-cache',
                                'X-Restli-Protocol-Version': '2.0.0'}
                        });
                user.methods.push('linkedin');
                user.profilePicture = profile.profilePicture;
                user.linkedinId = profile.id;
                await user.save();
            }
        }

        // if it doesn't exist, we create a new user
        else {
            // get user profile with the access token
            const profile = await axios
                .get('https://api.linkedin.com/v2/me',
                    { headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'cache-control': 'no-cache',
                            'X-Restli-Protocol-Version': '2.0.0'}
                    });

            user = new User({
                methods: ['linkedin'],
                email,
                profilePicture: profile.profilePicture,
                linkedinId: profile.id,
                name: profile.localizedFirstName + ' ' + profile.localizedLastName
            });
            await user.save();
        }

        // we return a jwt
        const jwtToken = signToken(user);
        res.cookie('access_token', jwtToken, {
            httpOnly: true
        });

        res.status(200).json({ jwtToken, portfolioId: user.portfolioID });
    },

    changePwd: async (req,res,next) =>{
        const user = req.user;
        const { oldPassword, newPassword } = req.body;

        if (! req.user.methods.includes('local')) {
            return next(ApiError.BadRequest('you are not connected locally'));
        }

        const password_comp = await bcrypt.compare(oldPassword, req.user.local.password);
        if(! password_comp){
            return next(ApiError.BadRequest('old password is not correct'));
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        await User.update({"local.email": user.local.email},{"local.password": passwordHash });
        return res.status(200).json({success: "success"})

    },

    // googleOAuth: async (req, res, next) => {

    //     const token = signToken(req.user);
    //     res.cookie('access_token', token, {
    //         httpOnly: true
    //     });
    //     res.status(200).json({ token, storeId: req.user.storeID });
    // },

    // facebookOAuth: async (req, res, next) => {
    //     const token = signToken(req.user);
    //     res.cookie('access_token', token, {
    //         httpOnly: true
    //     });
    //     res.status(200).json({ token, storeId: req.user.storeID });
    // }

}
