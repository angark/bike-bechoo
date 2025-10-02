const express = require("express");
const passport = require("passport");
 // Your post model, adjust path if needed



const router = express.Router();

// Start Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", // always show account chooser
  })
);

// Callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "https://www.bikebechoo.com/" }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`https://www.bikebechoo.com/auth-handler?token=${token}`);
  }
);


module.exports = router;
