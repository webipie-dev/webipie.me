const router = require('express-promise-router')();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConf = require('../middlewares/passport');
const userService = require('../services/user');
const { URLSearchParams } = require('url')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
// const {JWT_SECRET} = require('../configuration');
const { validateuser , user } = require('../models/user');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
router.route('/signup')
    .post(userService.signUp);

router.route('/signin')
    .post(passportSignIn, userService.signIn);

router.route('/confirmation/:token')
    .get(userService.confirmEmail);

router.route('/confirmation/resend/:token')
    .get(userService.resend);



router.route('/oauth/google').post(userService.loginWithGoogle);


router.route('/verified')
    .get(passportJWT, userService.userVerified)

router.route('/oauth/linkedin')
    .post(userService.linkedinOAuth);

// router.route('/oauth/facebook')
//     .post(passport.authenticate('facebookToken', { session: false }), storeOwnerService.facebookOAuth);

router.route('/changepwd')
    .post([
        validation.password
        ], validateRequest, passportJWT, userService.changePwd);

router.get('/secret' , passportJWT , async (req,res) => {
    res.status(200).send({sucess: 'authentified and verified!'});
});


module.exports = router;

