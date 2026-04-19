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
import authenticateUser from "../middlewares/authenticateUser.js";
import verifyUser from "../middlewares/verifyUser.js";

router.post("/register", register);
router.post("/verify-otp",verifyUser, verifyLimiter, verifyOTP);
router.post("/resend-otp",verifyUser, verifyLimiter, resendOTP);
router.post("/login", rateLimiter, login);
router.post("/reset-otp", verifyLimiter, resetOTP);
router.post("/verify-reset-otp", verifyLimiter, verifyResetOTP);
router.post("/reset-password", resetPassword);
router.post("/change-password",authenticateUser, changePassword);
router.post("/logout", authenticateUser, logout);

export default router;