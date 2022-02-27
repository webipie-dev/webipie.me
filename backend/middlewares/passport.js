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
      if(user.methods.includes("local") && user.verified === false){
        return done(ApiError.Forbidden('email must be verified!'), false);
      }

      // If user did not approve concent, return error
      if(user.approved === false) {
        return done(ApiError.Forbidden('You must approve consent!'), false);
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
  clientID : '49124487691-99k5mbpk8cf52e52i6c0ifc5cp672r6k.apps.googleusercontent.com',
  clientSecret : 'jl6kALTXXLHndRViUlCXqQbL',
  callbackURL: "http://localhost:4200"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile);
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
    let user = await User.findOne({ "email": email });

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
