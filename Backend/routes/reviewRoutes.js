const express = require("express");
const Review = require("../model/Review");

const router = express.Router();

// @desc   Post a new review
// @route  POST /api/reviews
router.post("/", async (req, res) => {
  try {
    const { name, title, content } = req.body;

    if (!name || !title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = new Review({ name, title, content });
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc   Get all reviews
// @route  GET /api/reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
