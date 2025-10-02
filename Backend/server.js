// server.js
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");

const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();

// ✅ Middleware

// CORS – allow frontend domain + credentials
app.use(cors({
  origin: [
    "http://localhost:3000",          // for local dev
    "https://bikebechoo.vercel.app",  // if deployed frontend
    "https://www.bikebechoo.com"      // your custom domain
  ],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ Session Store (fix MemoryStore warning)
app.set("trust proxy", 1); // important for HTTPS on Render
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret", // change in Render env
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    secure: true,      // HTTPS only (Render uses HTTPS)
    httpOnly: true,    // prevent JS access
    sameSite: "none"   // required for cross-site cookie
  }
}));

// ✅ Passport
require("./config/googleStrategy")(passport);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/post", require("./routes/sellRoutes"));
app.use("/api/form", require("./routes/formRoutes"));
app.use("/api/form", require("./routes/formDraft"));
app.use("/api/user", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/me", require("./routes/meRoute"));
app.use("/api/payment", paymentRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Start server (Render-ready)
const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
