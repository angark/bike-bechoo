//routes/sellRoutes.js

const express = require("express");
const router = express.Router();
const { createPost } = require("../controller/sellController");
const upload = require("../middleware/multer"); // ✅ make sure multer is required
const Post = require("../model/Sell");

const auth = require("../middleware/auth");
// ✅ this version parses form-data and makes req.body and req.files available
router.post(
  "/create",
  auth,
  upload.fields([
    { name: "rcImage", maxCount: 1 },
    { name: "bikeImages", maxCount: 10 },
  ]),
  createPost
);

router.get("/user", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Get logged-in user's posts
router.get("/my-posts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching my posts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a post by ID (only by owner)
// routes/sellRoutes.js
// routes/sellRoutes.js
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
      
    if (post.user.toString() !== req.userId) {
  return res.status(403).json({ message: "Not authorized" });
}

    await post.deleteOne();

    res.json({  success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// routes/postRoutes.js (or wherever your routes are defined)
// routes/postRoutes.js or similar
router.get("/getallposts", async (req, res) => {
  try {
    const posts = await Post.find({ postType: "Sell" })
                           .sort({ createdAt: -1 }); // Newest first
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// ✅ Route to fetch only Rent posts (Rent page)
router.get("/rent", async (req, res) => {
  try {
    const rentPosts = await Post.find({ postType: { $regex: /^rent$/i } })
                               .sort({ createdAt: -1 }); // Newest first
    res.json(rentPosts);
  } catch (error) {
    console.error("Error in /api/post/rent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;