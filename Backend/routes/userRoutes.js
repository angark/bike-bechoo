const express = require("express");
const router = express.Router();
const User = require("../model/User");
const auth = require("../middleware/auth");

// Get user credits
router.get("/credits", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      credits: user.credits,
      freePostsLeft: user.freePostsLeft || 0,
      firstPostFree: !user.hasPostedBefore,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch credits" });
  }
});

// Use one credit / free post
router.post("/use-credit", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(400).json({ message: "User not found" });

  // ✅ First post free
  if (!user.hasPostedBefore) {
    user.hasPostedBefore = true;
    user.postCount += 1;
    await user.save();
    return res.json({
      success: true,
      message: "First post free",
      credits: user.credits,
      freePostsLeft: user.freePostsLeft,
    });
  }

  // ✅ Use freePostsLeft (after payment)
  if (user.credits > 0) {
    user.credits -= 1;
    user.postCount += 1;
    await user.save();
    return res.json({
      success: true,
      message: "Post created using paid credits",
      credits: user.credits,
    });
  }
  return res
    .status(400)
    .json({ message: "No free posts or credits left, please pay ₹59" });
});

module.exports = router;
