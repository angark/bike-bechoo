// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  image: String,

  // Posting credits
  
  remainingPosts: { type: Number, default: 1 }, // 1 free post at signup
  totalPosts: { type: Number, default: 0 },
  lastPaymentDate: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
