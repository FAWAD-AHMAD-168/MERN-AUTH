import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { resendEmail } from "../config/resendEmail.js";
import jwt from "jsonwebtoken";






const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Choose a different username!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //GENERATING AN OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpAt = Date.now() + 10 * 60 * 1000;
    const verifyOTP = otp.toString();

    //SENDING OTP  FOR EMAIL CONFIRMATON
    const response = await resendEmail(
      email,
      "Email Verification OTP",
      `<p>Your OTP for email verification is: <h1>${verifyOTP}</h1> It is valid for 10 minutes.</p>`,
    );

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyotp: verifyOTP,
      verifyotpExpAt: otpExpAt,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Registered  and  OTP sent for email verification!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isExpired = user.verifyotpExpAt < Date.now();
    if (isExpired) {
      return res.status(400).json({ message: "OTP Expired!" });
    }

    const isTrue = user.verifyotp === otp;
    if (!isTrue) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }
    user.isConfirmed = true;
    user.verifyotp = "";
    user.verifyotpExpAt = 0;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const resendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required !!" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "User not found !!" });
  }
  if (user.isConfirmed) {
    return res.status(400).json({ message: "Email already verified !!" });
  }
  if (user.verifyotpExpAt > Date.now()) {
    return res.status(400).json({
      message: "OTP already sent.",
    });
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpAt = Date.now() + 10 * 60 * 1000;
  const verifyOTP = otp.toString();
  user.verifyotp = verifyOTP;
  user.verifyotpExpAt = otpExpAt;
  await user.save();
  // SENDING OTP  FOR EMAIL CONFIRMATON
  await resendEmail(
    email,
    "Email Verification OTP",
    `<p>Your OTP for email verification is: <h1>${verifyOTP}</h1> It is valid for 10 minutes.</p>`,
  );
  res.status(200).json({ message: "OTP Resent!" });
};




//login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Both email and password are required!" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "No User Found!" });
    }
    if (!user.isConfirmed) {
      return res
        .status(403)
        .json({ message: "Please verify your email first." });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
    const token = jwt.sign(
      { userID: user._id, email: user.email, name: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error !!! " });
  }
};





//LOGOUT
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout Successfull! " });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
};





//FORGOT PASSWORD

const resetOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    if (user.resetOtpExpAt > Date.now()) {
      return res.status(400).json({
        message: "Password Reset has already been sent!",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpAt = Date.now() + 10 * 60 * 1000;
    const resetOtp = otp.toString();
    user.resetOtp = resetOtp;
    user.resetOtpExpAt = otpExpAt;
    await user.save();
    // SENDING OTP  FOR EMAIL CONFIRMATON
    await resendEmail(
      email,
      "Password Reset OTP",
      `<p>Your OTP for <strong>password reset</strong> is: <h1>${resetOtp}</h1> It is valid for 10 minutes.</p>`,
    );
    res.status(200).json({ message: "Reset OTP sent!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const verifyResetOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "All fields are required !!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found !!" });
    }

    const isExpired = user.resetOtpExpAtotpExpAt < Date.now();
    if (isExpired) {
      return res.status(400).json({ message: "OTP Expired !!" });
    }

    const isTrue = user.resetOtp === otp;
    if (!isTrue) {
      return res.status(400).json({ message: "Invalid OTP  !!" });
    }
    user.resetOtpConfirmed = true;
    user.resetOtp = "";
    user.resetOtpExpAt = 0;
    await user.save();
    res.status(200).json({
      message: "Email verified successfully.You can reset your password now.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!!!" });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    if (!email || !newPassword) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    if (user.resetOtpConfirmed === false) {
      return res.status(400).json({ message: "RESET OTP is not verified" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtpConfirmed = false;
    await user.save();

    await resendEmail(
      email,
      "Password Reset Successful",
      `<p>Your password has been reset successfully. You can now login with your new password.</p>`,
    );

    return res
      .status(200)
      .json({ message: "Password reset successful. You can login now." });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!" });
  }
};





//Change the Password
const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (!user.isConfirmed) {
      return res.status(400).json({
        message: "Veirfy your email first for changing the password ",
      });
    }
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "New Password must be different!!" });
    }
    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect Credentials!!" });
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export {
  register,
  verifyOTP,
  resendOTP,
  login,
  logout,
  resetOTP,
  verifyResetOTP,
  resetPassword,
  changePassword,
};
