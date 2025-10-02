const express = require("express");
const router = express.Router();

// /api/me -> returns current logged in user
router.get("/", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    picture: req.user.picture,
    token: req.user.token
  });
});

module.exports = router;
