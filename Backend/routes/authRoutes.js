const express = require("express");
const router = express.Router();
const {
  register,
  verifyOTP,
  login,
  logout,
  resendOTP,
  resetOTP,
  verifyResetOTP,
  resetPassword,
  changePassword,
} = require("../controllers/authControllers.js");
const limiter = require("../middlewares/rateLimiter.js");
 const verifyLimiter = require("../middlewares/verifyLimiter.js");

router.post("/register", register);
router.post("/verify-otp",limiter, verifyOTP);
router.post("/resend-otp",verifyLimiter, resendOTP);
router.post("/login",limiter, login);
router.post("/reset-otp",verifyLimiter, resetOTP);
router.post("/verify-reset-otp",limiter, verifyResetOTP);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);
router.post("/logout", logout);


module.exports = router;
