// routes/contactRoutes.js
const express = require("express");
const Post = require("../model/Rent"); // Your Rent model
const router = express.Router();

router.get("/random", async (req, res) => {
  try {
    const contacts = await Post.aggregate([
      { $sample: { size: 3 } },
      { $project: { contactName: 1, contactMobile: 1, _id: 0 } }
    ]);
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
