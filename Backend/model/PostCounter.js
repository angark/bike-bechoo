//PostCounter.js
const mongoose = require("mongoose");

const PostCounterSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "sell" or "rent"
  lastNumber: { type: Number, default: 0 }
});

module.exports = mongoose.model("PostCounter", PostCounterSchema);
