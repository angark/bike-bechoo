// routes/paymentRoutes.js
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/User");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post("/order", auth, async (req, res) => {
  try {
    const options = { amount: 5900, currency: "INR", receipt: `receipt_${Date.now()}` };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify payment & update credits
router.post("/verify", auth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                  .update(body.toString())
                                  .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  try {
    const user = await User.findById(req.userId);
    user.remainingPosts += 3;  // Add 3 credits
    user.lastPaymentDate = new Date();
    await user.save();

    res.json({ success: true, remainingPosts: user.remainingPosts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update credits" });
  }
});

module.exports = router;
