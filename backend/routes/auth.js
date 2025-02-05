const express = require("express");
const passport = require("passport");
const { registerUser, loginUser, logoutUser, getProfile } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);
// router.get("/logout", logoutUser);
// router.get("/profile", getProfile);

module.exports = router;
