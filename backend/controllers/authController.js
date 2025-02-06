const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    console.log("JWT token generated:", token);

    // Step 3: Set JWT token in HTTP-only cookie
    res.cookie("jwtToken", token, {
      httpOnly: true, // Secure cookie (cannot be accessed via JS)
      maxAge: 3600000, // Token expires in 1 hour
      sameSite: "Strict",
    });

    console.log("JWT token set in HTTP-only cookie");

    // Step 4: Send response to client
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = (req, res) => {
  res.cookie("jwtToken", "", {
    httpOnly: true,
    expires: new Date(0), // Expire the cookie immediately
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const getProfile = (req, res) => {
  if (!req.user) {
    console.log("No user authenticated:", req.user);
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ user: req.user });
};

const verifyAuth = (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Not authenticated" });
  }
  res.json({ isAuthenticated: true, user: req.user });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  verifyAuth,
  logoutUser,
};
