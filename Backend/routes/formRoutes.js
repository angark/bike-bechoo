const express = require("express");
const router = express.Router();
const Post = require("../model/Sell");
const User = require("../model/User");
const upload = require("../middleware/multer");
const auth = require("../middleware/auth");
require("dotenv").config();

// CREATE POST
router.post("/create", auth, upload.any(), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // --- Check remaining posts ---
    if (!user.remainingPosts || user.remainingPosts <= 0) {
      return res.status(403).json({
        success: false,
        message: "No free posts left. Please pay ₹59 to unlock 3 more posts.",
      });
    }

    // --- Deduct one post credit ---
    user.remainingPosts -= 1;
    user.totalPosts += 1;
    await user.save();

    // --- Extract fields from body ---
    const {
      postType,
      brand,
      model,
      customBrandName,
      customModelName,
      year,
      rcNumber,
      pincode,
      state,
      city,
      area,
      ownership,
      price,
      pricePerDay,
      pricePerWeek,
      enginecpacity,
      kilometerdriven,
      fueltype,
      accident,
      accidentType,
      anymodification,
      insurancestatus,
      contactName,
      contactMobile,
      rcImage: rcImageUrl,
      bikeImages: bikeImageUrls,
    } = req.body;

    // --- Basic validation ---
    if (!postType || !year || !ownership || !contactName || !contactMobile) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // --- Determine final brand/model ---
    const finalBrand = brand?.toLowerCase() === "other" && customBrandName ? customBrandName : brand;
    const finalModel = model?.toLowerCase() === "other" && customModelName ? customModelName : model;

    // --- Handle uploaded files ---
    const rcImage = req.files?.find(f => f.fieldname === "rcImage")?.path || rcImageUrl || "";
    const bikeImages = req.files
      ?.filter(f => f.fieldname === "bikeImages")
      .map(f => f.path) || 
      (Array.isArray(bikeImageUrls) ? bikeImageUrls : bikeImageUrls ? [bikeImageUrls] : []);

    // --- Create new post ---
    const newPost = new Post({
      postType,
      brand: finalBrand,
      model: finalModel,
      customBrandName: brand?.toLowerCase() === "other" ? customBrandName : "",
      customModelName: model?.toLowerCase() === "other" ? customModelName : "",
      year,
      rcNumber,
      rcImage,
      pincode,
      state,
      city,
      area,
      ownership,
      price,
      pricePerDay,
      pricePerWeek,
      enginecpacity,
      kilometerdriven,
      fueltype,
      accident,
      accidentType,
      anymodification,
      insurancestatus,
      contactName,
      contactMobile,
      bikeImages,
      user: req.userId,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      post: newPost,
      remainingPosts: user.remainingPosts, // updated credits
    });

  } catch (err) {
    console.error("💥 Error creating post:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating post",
      error: err.message,
    });
  }
});

module.exports = router;
