// Backend/config/googleStrategy.js

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://bike-bechoo-6.onrender.com/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
            });
          }

          const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, image: user.image },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );

          // Send token via query param
          return done(null, { token });
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};
