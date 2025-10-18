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
const rateLimiter = require("../middlewares/rateLimiter.js");
 const verifyLimiter = require("../middlewares/verifyLimiter.js");
 const verifyUser = require("../middlewares/userAuth.js");

router.post("/register", register);
router.post("/verify-otp",verifyLimiter, verifyOTP);
router.post("/resend-otp",verifyLimiter, resendOTP);
router.post("/login",rateLimiter, login);
router.post("/reset-otp",verifyLimiter, resetOTP);
router.post("/verify-reset-otp",verifyLimiter, verifyResetOTP);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);
router.post("/logout", logout);


module.exports = router;
