//Sell.js

const mongoose = require("mongoose");

const SellSchema = new mongoose.Schema({
  
 postId: { type: String, unique: true, required: true },


  postType: String,
  bikeType: String,
  brand: String,   // <-- will already be replaced with customBrandName if needed
  model: String,   // <-- will already be replaced with customModelName if needed
  customBrandName:String,
  customModelName:String,
  year: String,




  // RC Details
  rcNumber: String,
  rcImage: String,

  // Location Info
  pincode: String,
  state: String,
  city: String,
  area: String,

  // Bike Specs
  ownership: String,
  price: String,
  pricePerDay: String,
  pricePerWeek: String,
  enginecpacity: String,
  kilometerdriven: String,
  fueltype: String,
  accident: String,
  accidentType: String,
  anymodification: String,
  insurancestatus: String,

  // Contact Info
  contactName: String,
  contactMobile: String,

  // Images
  bikeImages: [String],

  // Link to user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Post", SellSchema);
