const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
        try {
          // Check if user already exists
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            // Create new user
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
            });
          }

          // Instead of returning a JWT, just return the user object
          return done(null, user); // Passport stores this in session
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  // Serialize user into session
  passport.serializeUser((user, done) => {
    done(null, user._id); // store only user ID in session
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user); // attach full user object to req.user
    } catch (err) {
      done(err, null);
    }
  });
};
