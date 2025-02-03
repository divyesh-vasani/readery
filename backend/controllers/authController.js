const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

const loginUser = (req, res) => {
  res.json({ message: "Logged in successfully", user: req.user });
};

const logoutUser = (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
};

const getProfile = (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
  res.json({ user: req.user });
};

module.exports = { registerUser, loginUser, logoutUser, getProfile };
