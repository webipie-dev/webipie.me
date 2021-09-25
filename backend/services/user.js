const JWT = require('jsonwebtoken');
const {validateuser, User} = require('../models/user');
const {JWT_SECRET, EMAIL} = require('../configuration/index');
const bcrypt = require('bcrypt');
const ApiError = require("../errors/api-error");
const {sendEmail} = require('./email');
const Portfolio = require('../models/portfolio');
const querystring = require('querystring');
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');

const { hostname, httpProtocol, port, clientPort, clientHostname, LINKEDIN_CLIENT_SECRET, LINKEDIN_CLIENT_ID} = require('../configuration/index');


signToken = user => {
    return JWT.sign({
        iss: 'NameOfProject',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
};


module.exports = {
    signUp: async (req, res, next) => {
        const {error} = validateuser(req.body);
        if (error) return next(ApiError.BadRequest(error.details[0].message));

        let {name, email, password} = req.body;
        email = email.toLowerCase();
        let findUser = await User.findOne({email});
        // if user already exists
        if (findUser) {
            // if signed up locally
            if (findUser.methods.includes('local')) {
                return next(ApiError.BadRequest('Email is already in use'));
            }
            // if signed up using linkedin or google
            else {
                // Let's merge them?
                findUser.methods.push('local')
                findUser.password = password.trim()
                findUser.name = name
                await findUser.save()
            }

            // Generate the token
            const token = signToken(findUser);
            // Respond with token
            res.cookie('access_token', token, {
                httpOnly: true
            });
            res.status(200).json({token, portfolioId: findUser.portfolioID});
        }


        const newUser = new User({
            methods: ['local'],
            name,
            email,
            password: password.trim()
        });
        await newUser.save();
        const token = signToken(newUser);

        let portString = `:${clientPort}`;
        if(`${clientPort}` === '430')
            portString = '';
        // send mail of verification
        let emailError = sendEmail(
            EMAIL.USER, email, 'Account Verification',
            `
            <style>
            * {
            padding: 0px;
            margin: 0px;
            font-family: 'Montserrat',sans-serif; }
          
          .cos-header-container {
            width: 100vw;
            background-color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            height: 100px; }
            .cos-header-container .cos-header {
              height: inherit;
              width: 80%;
              max-width: 800px;
              margin: auto;
              display: flex;
              justify-content: space-around;
              padding: 15px;
              box-sizing: border-box;
              align-items: center; }
              .cos-header-container .cos-header .cos-left {
                width: 40%;
                max-width: 200px; }
                .cos-header-container .cos-header .cos-left img {
                  height: 100%;
                  max-height: 70px; }
              .cos-header-container .cos-header .cos-right {
                width: fit-content;
                max-width: 400px; }
                .cos-header-container .cos-header .cos-right a {
                  text-decoration: none;
                  color: #109622;
                  transition: color 0.5s ease; }
                .cos-header-container .cos-header .cos-right a:hover {
                  color: darkgrey; }
              @media (max-width: 400px) {
                .cos-header-container .cos-header .right {
                  display: none; } }
          
          .cos-body {
            width: 100vw;
            margin: auto;
            text-align: center;
            padding: 100px;
            box-sizing: border-box;
            background-color: white; }
            .cos-body img {
              width: 95%;
              max-width: 500px; }
            .cos-body h1, .cos-body p, .cos-body button {
              margin-top: 20px;
              padding: 10px;
              box-sizing: content-box; }
            .cos-body button {
              color: #fff;
              background-color: #1bc943;
              border-color: #1bc943;
              cursor: pointer;
              border: none;
              box-shadow: 0px 0px 5px #1bc94462; }
          
          .cos-card {
            position: relative;
            height: 100vh; }
          
          .cos-footer {
            border-top: 1px solid lightgrey;
            position: absolute;
            bottom: 0px;
            left: 0px;
            padding: 10px;
            box-sizing: content-box;
            width: 100vw; }
            .cos-footer .icons {
              max-height: 100px;
              display: flex;
              width: 100%;
              max-width: 500px;
              margin: auto;
              justify-content: center;
              align-items: center; }
              .cos-footer .icons fa-icon {
                font-size: 40px;
                transition: color 0.5s ease;
                color: lightgrey;
                cursor: pointer;
                margin: auto; }
              .cos-footer .icons fa-icon:hover {
                color: #3aaf85; }
          
            </style>
            <div class="cos-card">
            <div class="cos-header-container">
                <div class="cos-header">
                    <div class="cos-left">
                        <img src="https://webipie.me/assets/SVG/logo.svg" alt="logo">
                    </div>
                    <div class="cos-right">
                        <a href="#">Go back to the website</a>
                    </div>
                </div>
            </div>
            <div class="cos-body">
                <!-- <img src="https://webipie.me/assets/SVG/email.svg"> -->
                <img src="assets/email.svg">
                <h1>Welcome to Webipie.me</h1>
                <p>We Created a personal account for you. Please confirm your e-mail adress</p>
                <a href="#"><button>Confirm Email</button></a>
            </div>
            <div class="cos-footer">
                <div class="icons">
                    <fa-icon [icon]="facebook"></fa-icon>
                    <fa-icon [icon]="twitter"></fa-icon>
                    <fa-icon [icon]="linkedin"></fa-icon>
                </div>
            </div>
        </div>`
            // `Hello ${name},\n\nPlease verify your account by clicking the link: \n ${httpProtocol}://${clientHostname}${portString}/register/confirmation?token=${token}\n\nThank You!\n`
        )
        // TODO: handle email failure correctly, this always returns undefined:
        if (emailError)
            return res.status(500).send({msg: 'Technical Issue!, Please click on resend for verify your Email.'});

        res.cookie('access_token', token, {
            httpOnly: true
        });
        return res.status(200).json({token, verified: newUser.verified});
    },

    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });

        res.status(200).json({token, portfolioId: req.user.portfolioID, verified: req.user.verified});
    },

    confirmEmail: async (req, res, next) => {
        try {
            const token = req.params.token;
            const payload = JWT.verify(token, JWT_SECRET);
            const user = await User.findById(payload.sub);
            if (!user) {
                return next(ApiError.Unauthorized('You don\'t have an account'));
            }

            user.verified = true;
            await user.save();

            res.status(200).json({message: "successful confirmation!"});
        } catch (err) {
            return next(ApiError.BadRequest('Your verification link may have expired. Please click on resend for verify your Email.'));
        }
    },

    resend: async (req, res, next) => {
        const token = req.params.token;
        const payload = JWT.verify(token, JWT_SECRET);
        const user = await User.findById(payload.sub);
        if (!user) {
            return next(ApiError.Unauthorized('You don\'t have an account'));
        } else if (user.verified) {
            return res.status(200).send('This account has been already verified. Please log in.');

        } else {
            let portString = `:${clientPort}`;
            if(`${clientPort}` === '430')
                portString = '';
            // send mail of verification
            var emailError = sendEmail(
                EMAIL.USER, user.email, 'Account Verification',
                `Hello ${user.name},\n\nPlease verify your account by clicking the link: \n ${httpProtocol}://${clientHostname}${portString}/register/confirmation?token=${token}\n\nThank You!\n`
            );
            // TODO: handle email failure correctly, this always returns undefined:
            if (emailError)
                return res.status(500).json({msg: 'Technical Issue!, Please click on resend for verify your Email.'});
        }
    },

    linkedinOAuth: async (req, res, next) => {
        // get the token from frontend
        const {token} = req.body

        // get an access token from linkedin API
        const result = await axios
            .post("https://www.linkedin.com/oauth/v2/accessToken", querystring.stringify({
                grant_type: "authorization_code",
                code: token,
                redirect_uri: `${httpProtocol}://${clientHostname}:${clientPort}/register/linkedin-verif`,
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET
            }));
        const accessToken = result.data.access_token;

        // get the user's email address
        const emailRequest = await axios
            .get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=' + accessToken);
        const email = emailRequest.data.elements[0]['handle~'].emailAddress.toLowerCase();

        //check if the user already exists or not
        let user = await User.findOne({email});

        // if the user exists, we check whether he signed up with linkedin or not
        if (user) {
            // if not with linkedin, we update the user's information
            if (user.methods.indexOf('linkedin') === -1) {
                // get user profile with the access token
                try {
                    const profile = await axios
                        .get('https://api.linkedin.com/v2/me',
                            {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`,
                                    'cache-control': 'no-cache',
                                    'X-Restli-Protocol-Version': '2.0.0'
                                }
                            });
                    user.methods.push('linkedin');
                    user.profilePicture = profile.data.profilePicture;
                    user.linkedinId = profile.data.id;
                    await user.save();
                }catch (e) {
                    return next(ApiError.BadRequest('There has been a mistake with Linkedin Authentication.'));
                }

            }
        }

        // if it doesn't exist, we create a new user
        else {
            // get user profile with the access token
            try {
                const profile = await axios
                    .get('https://api.linkedin.com/v2/me',
                        {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'cache-control': 'no-cache',
                                'X-Restli-Protocol-Version': '2.0.0'
                            }
                        });
                user = new User({
                    methods: ['linkedin'],
                    email,
                    profilePicture: profile.data.profilePicture.displayImage,
                    linkedinId: profile.id,
                    name: profile.data.localizedFirstName + ' ' + profile.data.localizedLastName,
                    verified: true
                });
                await user.save();
            }catch(err) {
                return next(ApiError.BadRequest('There has been a mistake with Linkedin Authentication.'));
            }
        }

        // we return a jwt
        const jwtToken = signToken(user);
        res.cookie('access_token', jwtToken, {
            httpOnly: true
        });

        res.status(200).json({jwtToken, portfolioId: user.portfolioID});
    },

    changePwd: async (req, res, next) => {
        const user = req.user;
        const {oldPassword, newPassword} = req.body;

        if (!req.user.methods.includes('local')) {
            return next(ApiError.BadRequest('you are not connected locally'));
        }

        const password_comp = await bcrypt.compare(oldPassword, req.user.password);
        if (!password_comp) {
            return next(ApiError.BadRequest('old password is not correct'));
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        await User.updateOne({"email": user.email}, {"password": passwordHash});
        return res.status(200).json({success: "success"})

    },

    googleOAuth: async (req, res, next) => {

        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ token, storeId: req.user.storeID });
    },

    loginWithGoogle: async (req, res, next) => {

        const {access_token} = req.body
        const oAuth2Client = new OAuth2Client(
            '49124487691-99k5mbpk8cf52e52i6c0ifc5cp672r6k.apps.googleusercontent.com',
            'jl6kALTXXLHndRViUlCXqQbL',
            `${httpProtocol}://${clientHostname}:${clientPort}`
        );


        const ticket = await oAuth2Client.verifyIdToken({
            idToken: access_token,
            audience: '49124487691-99k5mbpk8cf52e52i6c0ifc5cp672r6k.apps.googleusercontent.com'
        })
        const user = ticket.getPayload();


        const existingUser = await User.findOne({"email" : user.email});
        if (existingUser){
            console.log('user already exists in BD');
            const token = signToken(existingUser);
            return res.status(200).json({token, portfolioId: existingUser.portfolioID})
        }

        if(! user.email_verified){
            return next(ApiError.BadRequest('Email must be verified.'));
        }

        console.log('User dosen\'t exist we create new one');

        const newUser = new User({
            method: ['google'],
            email: user.email,
            name: user.name,
            profilePicture: user.picture,
            googleId: user.sub,
            verified: true
        });

        await newUser.save();
        const token = signToken(newUser);
        res.status(200).json({ token, portfolioId: newUser.portfolioID });
    },

    userVerified: async (req, res, next) => {
        const token = req.user;
        if(token.verified) {
            return res.status(200).json({verified: true});
        } else {
            return res.status(200).json({verified: false});
        }
    },

    getUsername: async (req, res, next) => {
        const token = req.user;
        return res.status(200).json({name: token.name});
    },

    markGuideTourDone: async (req, res, next) => {
        const token = req.user;
        const user = await User.findById(token._id);
        user.firstVisit = false;
        await user.save();
        return res.status(200).json({operation: 'success'});
    },

    verifyFirstVisit: async (req, res, next) => {
        const token = req.user;
        console.log(token)
        return res.status(200).json({firstVisit: token.firstVisit});
    }
}
