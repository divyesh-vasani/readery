const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  verifyAuth,
  getProfile,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);
router.get(
  "/verify-auth",
  passport.authenticate("jwt", { session: false }),
  verifyAuth
);
router.post("/logout", logoutUser);

module.exports = router;
