const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');

const config = require('../configuration/index');
const {User} = require('../models/user');
const ApiError = require("../errors/api-error");

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET,
    passReqToCallback: true
  }, async (req, payload, done) => {
    try {
      // Find the user specified in token
      const user = await User.findById(payload.sub);

      // If user doesn't exists, handle it
      if (!user) {
        return done(null, false);
      }

      // If user's email is not verified it, return error
      if(user.methods.includes("local") && user.local.verified == false){
        return done(ApiError.Forbidden('email must be verified!'), false);
      }

      // Otherwise, return the user
      req.user = user;
      done(null, user);
    } catch(error) {
      done(error, false);
    }
}));

// GOOGLE OAUTH STRATEGY
passport.use('googleToken' , new GoogleTokenStrategy({
  clientID : '790108924491-t5da8keoe1srskluak4jpi4oue78gcai.apps.googleusercontent.com',
  clientSecret : 'oQwzeTlMcqnoAT96ZsQpZkFQ'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({"google.id" : profile.id});
    if (existingUser){
      console.log('user already exists in BD');
      return done(null, existingUser);
    }

    console.log('User dosen\'t exist we create new one');

    const newUser = new User({
      method: ['google'],
      google: {
        id: profile.id,
        email: profile.emails[0].value
      },
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));


// TODO: replace facebook startegy with linkedin startegy 
// https://levelup.gitconnected.com/step-by-step-guide-to-authenticate-users-with-linkedin-in-your-express-app-10af68b91b13

// FACEBOOK OAUTH STRATEGY
passport.use('facebookToken' , new FacebookTokenStrategy({
  clientID : '348023999826107',
  clientSecret: '097f813e65edd9538d6606b09b562bd7'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken ', accessToken);
    console.log('refreshToken ', refreshToken);
    console.log('profile ', profile);

    const existingUser = await User.findOne({"facebook.id" : profile.id});
    if (existingUser){
      console.log('User already exists in BD');
      return done(null, existingUser);
    }

    console.log('User dosen\'t exist we create new one');

    const newUser = new User({
      methods: ['facebook'],
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      },
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));


// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    let user = await User.findOne({ "local.email": email });

    // If not, handle it
    if (!user) {
      return done(null, false);
    }

    // console.log(user)
    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);

    // console.log(isMatch)
    // If not, handle it
    if (!isMatch) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));
