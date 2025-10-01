//Draft.js
const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  formData: { type: Object, default: {} },
  step: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Draft", draftSchema);
