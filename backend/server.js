const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Make sure session middleware is set up before passport
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Initialize passport after the session middleware
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Hello, Backend!");
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
