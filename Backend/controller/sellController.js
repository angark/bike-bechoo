const Post = require("../model/Sell");
const User = require("../model/User");
const axios = require("axios");
const PostCounter = require("../model/PostCounter");

// helper to generate postId
async function getNextPostId(postType) {
  const type = postType.toLowerCase();
  const prefix = type === "sell" ? "S" : "R";
  const counter = await PostCounter.findOneAndUpdate(
    { type },
    { $inc: { lastNumber: 1 } },
    { new: true, upsert: true }
  );
  const paddedNumber = counter.lastNumber.toString().padStart(5, "0");
  return `${prefix}${paddedNumber}`;
}

exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    // --- 1️⃣ Check free post / credits ---
    if (!user.freePostUsed) {
      // First free post
      user.freePostUsed = true;
    } else if (user.credits > 0) {
      // Use 1 credit
      user.credits -= 1;
    } else {
      // No free post or credits left → ask for payment
      return res.status(403).json({
        success: false,
        message: "No credits left. Please pay ₹59 to get 3 more posts."
      });
    }

    // Save user changes (update freePostUsed / credits)
    await user.save();

    // --- 2️⃣ reCAPTCHA verification ---
    const recaptchaToken = req.body.recaptchaToken;
    if (!recaptchaToken) {
      return res.status(400).json({ message: "Missing reCAPTCHA token" });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const { data: recaptchaData } = await axios.post(verifyUrl, null, {
      params: { secret: secretKey, response: recaptchaToken },
    });

    if (!recaptchaData.success) {
      return res.status(403).json({ message: "Failed reCAPTCHA verification" });
    }

    // --- 3️⃣ Extract fields ---
    let {
      postType, bikeType, brand, customBrandName, model, customModelName, year,
      rcNumber, pincode, state, city, area,
      ownership, price, pricePerDay, pricePerWeek,
      enginecpacity, kilometerdriven, fueltype, accident,
      accidentType, anymodification, insurancestatus,
      contactName, contactMobile,
    } = req.body;

    let finalBrand = brand;
    let finalModel = model;
    if (brand?.trim().toLowerCase() === "other" && customBrandName?.trim()) {
      finalBrand = customBrandName.trim();
    }
    if (model?.trim().toLowerCase() === "other" && customModelName?.trim()) {
      finalModel = customModelName.trim();
    }

    // --- 4️⃣ Images ---
    const rcImageUrl = (req.files?.rcImage?.[0]?.path) || req.body.rcImage || "";
    let bikeImageUrls = [];
    if (req.files?.bikeImages) {
      bikeImageUrls = req.files.bikeImages.map((f) => f.path);
    } else if (req.body.bikeImages) {
      if (typeof req.body.bikeImages === "string") {
        try {
          bikeImageUrls = JSON.parse(req.body.bikeImages);
        } catch {
          bikeImageUrls = [req.body.bikeImages];
        }
      } else if (Array.isArray(req.body.bikeImages)) {
        bikeImageUrls = req.body.bikeImages;
      }
    }

    if (!bikeImageUrls.length) {
      return res.status(400).json({ message: "At least one bike image is required" });
    }

    // --- 5️⃣ Generate postId & save ---
    const postId = await getNextPostId(postType);

    const newPost = new Post({
      postId,
      postType,
      bikeType,
      brand: finalBrand,
      model: finalModel,
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
      bikeImages: bikeImageUrls,
      rcImage: rcImageUrl,
      user: req.userId
    });

    await newPost.save();

    res.status(201).json({ success: true, message: "Post created successfully", post: newPost });

  } catch (err) {
    console.error("Error in createPost:", err);
    res.status(500).json({ message: "Server error while creating post" });
  }
};
