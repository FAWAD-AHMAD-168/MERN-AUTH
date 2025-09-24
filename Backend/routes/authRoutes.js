const express = require("express");
const router = express.Router();
const {
  register,
  verifyOTP,
  resendOTP,
  resetOTP,
  verifyResetOTP,
  resetPassword,
  changePassword,
} = require("../controllers/authControllers.js");

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/reset-otp", resetOTP);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);


module.exports = router;
