const express = require("express");
const passport = require("passport");
const { registerUser, loginUser, logoutUser, getProfile } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.get("/logout", logoutUser);
router.get("/profile", getProfile);

module.exports = router;
