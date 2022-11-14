const JWT = require('jsonwebtoken');
const {validateuser, User} = require('../models/user');
const {JWT_SECRET, EMAIL} = require('../configuration/index');
const bcrypt = require('bcrypt');
const ApiError = require("../errors/api-error");
const {sendEmail} = require('./email');
const generator = require('generate-password');
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
<div class="cos-card" style="background-color: #1b3721; color: white ; padding: 50px 0;">
    <div class="cos-header-container" >
        <div class="cos-header" style="display: flex; width: fit-content; margin:0 auto; align-items:center; ">
            <div class="cos-left">
                <img src="https://webipie.me/assets/SVG/logo.png" alt="logo" style="width:150px">
            </div>
            <div class="cos-right" style="margin : 40px 0 0 80px">
                <a href="#" style="font-size: 2vw; color: white;text-decoration:none">Go back to the website</a>
            </div>
        </div>
    </div>
    <div class="cos-body" style="text-align:center">
        <!-- <img src="https://webipie.me/assets/SVG/email.svg"> -->
        <img src="https://webipie.me/assets/email.png" style="width:18vw; height:18vw; object-fit:cover ;background-color: white; border-radius:50%">
        <h1 style="width:90%; margin: auto;color: white;">Hello ${name}, Welcome to Webipie.me</h1>
        <p style="font-size:20px; width:90%; margin: 20px auto;color:white;">We Created a personal account for you. Please confirm your e-mail adress</p>
        <a href="${httpProtocol}://${clientHostname}${portString}/register/confirmation?token=${token}" style="text-decoration: none; color: white; background-color: #3aaf85; padding:15px 25px; margin-bottom:50px">Confirm Email</a>
        <hr style="margin-top:25px">
        <p style="font-size:18px; width:90%;margin:auto">In case the button doesn't work please visit this link ${httpProtocol}://${clientHostname}${portString}/register/confirmation?token=${token}\n\nThank You!\n</p>
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

    sendNewPassword: async (req, res, next) => {
        const { email } = req.body
        // check whether the email exists in DB
        const user = await User.findOne({ email });
        if (!user) {
            return next(ApiError.NotFound('User Not Found'));
        }

        // Generate new password and save it to DB
        const newPassword = generator.generate({
            length: 10,
            numbers: true
        });
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);
        await User.updateOne({email}, {password: passwordHash});

        const name = user.name;
        // Send Email containing new password
        let emailError = sendEmail(
            EMAIL.USER, email, 'New Password',
            `   
<div class="cos-card" style="background-color: #1b3721; color: white ; padding: 50px 0;">
    <div class="cos-header-container" >
        <div class="cos-header" style="display: flex; width: fit-content; margin:0 auto; align-items:center; ">
            <div class="cos-left">
                <img src="https://webipie.me/assets/SVG/logo.png" alt="logo" style="width:150px">
            </div>
            <div class="cos-right" style="margin : 40px 0 0 80px">
                <a href="#" style="font-size: 2vw; color: white;text-decoration:none">Go back to the website</a>
            </div>
        </div>
    </div>
    <div class="cos-body" style="text-align:center">
        <!-- <img src="https://webipie.me/assets/SVG/email.svg"> -->
        <img src="https://webipie.me/assets/email.png" style="width:18vw; height:18vw; object-fit:cover ;background-color: white; border-radius:50%">
        <h1 style="width:90%; margin: auto;color: white;">Hello ${name}, We create a new password for you !</h1>
        <p style="font-size:25px; width:90%; margin: 20px auto;color:white;">New Password: <strong>${newPassword}</strong></p>
        <h3 style="width:90%; margin: auto;color: white;">Make sure you change it ASAP !</h3>
        <hr style="margin-top:25px">
    </div>
    <div class="cos-footer">
        <div class="icons">
            <fa-icon [icon]="facebook"></fa-icon>
            <fa-icon [icon]="twitter"></fa-icon>
            <fa-icon [icon]="linkedin"></fa-icon>
        </div>
    </div>
</div>`
        )
        if (emailError)
            return res.status(500).send({msg: 'Technical Issue!, Please click on resend for verify your Email.'});


        return res.status(200).json({success: "success"});
    },

    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({token, portfolioId: req.user.portfolioID, verified: req.user.verified, consent: req.user.consent});
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
                `   
<div class="cos-card" style="background-color: #1b3721; color: white ; padding: 50px 0;">
    <div class="cos-header-container" >
        <div class="cos-header" style="display: flex; width: fit-content; margin:0 auto; align-items:center; ">
            <div class="cos-left">
                <img src="https://webipie.me/assets/SVG/logo.png" alt="logo" style="width:150px">
            </div>
            <div class="cos-right" style="margin : 40px 0 0 80px">
                <a href="#" style="font-size: 2vw; color: white;text-decoration:none">Go back to the website</a>
            </div>
        </div>
    </div>
    <div class="cos-body" style="text-align:center">
        <!-- <img src="https://webipie.me/assets/SVG/email.svg"> -->
        <img src="https://webipie.me/assets/email.png" style="width:18vw; height:18vw; object-fit:cover ;background-color: white; border-radius:50%">
        <h1 style="width:90%; margin: auto;color: white;">Hello ${user.name}, Welcome to Webipie.me</h1>
        <p style="font-size:20px; width:90%; margin: 20px auto;color:white;">We Created a personal account for you. Please confirm your e-mail adress</p>
        <a href="${httpProtocol}://${clientHostname}${portString}/register/confirmation?token=${token}" style="text-decoration: none; color: white; background-color: #3aaf85; padding:15px 25px; margin-bottom:50px">Confirm Email</a>
        <hr style="margin-top:25px">
        <p style="font-size:18px; width:90%;margin:auto">In case the button doesn't work please visit this link ${httpProtocol}://${clientHostname}${portString}/register/confirmation?token=${token}\n\nThank You!\n</p>
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
            );
            // TODO: handle email failure correctly, this always returns undefined:
            if (emailError)
                return res.status(500).json({msg: 'Technical Issue!, Please click on resend for verify your Email.'});
            res.status(200).json({success: "true"});
        }
    },

    approveConsent: async (req, res, next) => {
        try {
            const user = await User.findByIdAndUpdate(req.user.id, { consent: true })
            res.status(201).send({ user, success: true })
        } catch (error) {
            return next(ApiError.BadRequest('Something went wrong when updating consent'));
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

        const passwordComp = await bcrypt.compare(oldPassword, req.user.password);
        if (!passwordComp) {
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
            return res.status(200).json({verified: true, consent: token.consent});
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
