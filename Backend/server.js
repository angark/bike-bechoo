//server.js

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

 // adjust path if need
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // ✅ Parse JSON
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
// CORS
app.use(cors({
    origin: "https://www.bikebechoo.com",
    credentials: true
}));

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// Session
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

// Passport
require("./config/googleStrategy")(passport);
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/post", require("./routes/sellRoutes"));
app.use("/api/form", require("./routes/formRoutes"));
app.use("/api/form", require("./routes/formDraft"));
app.use("/api/user", userRoutes);
app.use("/api/reviews", reviewRoutes);




// ✅ Razorpay routes
app.use("/api/payment", paymentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if DB fails
  });

// Start server (Render-ready)
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
