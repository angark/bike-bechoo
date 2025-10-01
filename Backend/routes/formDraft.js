// Backend/routes/formDraft.js
const express = require("express");
const router = express.Router();
const Draft = require("../model/Draft");
const auth = require("../middleware/auth"); // expects req.userid
const upload = require("../middleware/multer");

// Save or update draft
router.post("/save", auth, async (req, res) => {
  const userId = req.userId;
  const { formData, step } = req.body;
  try {
    const draft = await Draft.findOneAndUpdate(
      { userId },
      { formData, step, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ message: "Draft saved", draft });
  } catch (err) {
    console.error("Error saving draft:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get draft for user
router.get("/draft", auth, async (req, res) => {
  const userId = req.userId;
  try {
    const draft = await Draft.findOne({ userId });
    if (!draft) return res.json(null);
    res.json({ formData: draft.formData, step: draft.step });
  } catch (err) {
    console.error("Error fetching draft:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Clear draft
router.post("/clear", auth, async (req, res) => {
  const userId = req.userId;
  try {
    await Draft.deleteOne({ userId });
    res.json({ message: "Draft cleared" });
  } catch (err) {
    console.error("Error clearing draft:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Upload RC Image (single) and save to draft
router.post("/upload-rc-image", auth, upload.single("rcImage"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const imageUrl = req.file.path;
    // Save to draft
    await Draft.findOneAndUpdate(
      { userId: req.userId },
      { $set: { "formData.rcImage": imageUrl, updatedAt: new Date() } },
      { upsert: true, new: true }
    );
    res.json({ fileUrl: imageUrl });
  } catch (err) {
    console.error("Error uploading RC image:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// Upload bike images (multiple) and save to draft
router.post("/upload-bike-images", auth, upload.array("bikeImages", 4), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const fileUrls = req.files.map((file) => file.path);
    // Save to user's draft
    await Draft.findOneAndUpdate(
      { userId: req.userId },
      { $set: { "formData.bikeImages": fileUrls, updatedAt: new Date() } },
      { upsert: true, new: true }
    );
    return res.json({ fileUrls });
  } catch (error) {
    console.error("Error uploading bike images:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
});

//TO DEALTE THE FORM DATA AFTER SUCCESFULL POST SUBMIISION 
router.delete("/draft", auth, async (req, res) => {
  try {
    await Draft.deleteOne({ userId: req.userId });
    res.status(200).json({ message: "Draft deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete draft" });
  }
});


module.exports = router;