const router = require('express-promise-router')();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConf = require('../middlewares/passport');
const userService = require('../services/user');

// const {JWT_SECRET} = require('../configuration');
const { validateuser , user } = require('../models/user');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });

const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const LINKEDIN_CLIENT_ID = "77oj8s50xw1yt7";
const LINKEDIN_CLIENT_SECRET = "W8tanXzQrWJpjH6y";
const Linkedin = require('node-linkedin')(LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET);
router.route('/signup')
    .post(userService.signUp);

router.route('/signin')
    .post(passportSignIn, userService.signIn);

router.route('/confirmation/:token')
    .get(userService.confirmEmail);

router.route('/confirmation/resend/:token')
    .get(userService.resend);

/***
 * with another npm package (not passport, node-linkedin package)
 */
router.route('/auth/linkedin')
    .post(async function(req, res){
        const {token} = req.body
        console.log(token)
        let linkedin = Linkedin.init(token); // this.token = client token.
        linkedin.people.me(function(err, $in) {
            console.log($in)
            console.log('i got here')
            return 'hello'
            // Loads the profile of access token owner.
        });
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });

// for callback

/***
 * with passport
 */
router.get('/auth/linkedin/',
    passport.authenticate('linkedin', { state: 'SOME STATE'  }),
    function(req, res){
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    });

/***
 * /with passport
 */

// router.route('/oauth/google')
//     .post(passport.authenticate('googleToken', { session: false }), storeOwnerService.googleOAuth);

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

