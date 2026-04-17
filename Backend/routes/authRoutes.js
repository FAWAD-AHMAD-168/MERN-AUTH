import express from "express";
const router = express.Router();

import {
  register,
  verifyOTP,
  login,
  logout,
  resendOTP,
  resetOTP,
  verifyResetOTP,
  resetPassword,
  changePassword,
} from "../controllers/authControllers.js";

import rateLimiter from "../middlewares/rateLimiter.js";
import verifyLimiter from "../middlewares/verifyLimiter.js";
import verifyUser from "../middlewares/userAuth.js";

router.post("/register", register);
router.post("/verify-otp", verifyLimiter, verifyOTP);
router.post("/resend-otp", verifyLimiter, resendOTP);
router.post("/login", rateLimiter, login);
router.post("/reset-otp", verifyLimiter, resetOTP);
router.post("/verify-reset-otp", verifyLimiter, verifyResetOTP);
router.post("/reset-password", resetPassword);
router.post("/change-password",verifyUser, changePassword);
router.post("/logout", logout);

export default router;