const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const transporter = require("../config/nodemailer.js");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required !!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists !!" });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "Choose a different username !!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //GENERATING AN OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpAt = Date.now() + 10 * 60 * 1000;
    const verifyOTP = otp.toString();

    //SENDING OTP  FOR EMAIL CONFIRMATON
    const mailOptions = {
      from: process.env.SMTP_SENDER,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${verifyOTP}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

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
      .json({ message: "REGISTERED AND OTP SENT for email verification!!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "All fields are required !!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found !!" });
    }

    const isExpired = user.verifyotpExpAt < Date.now();
    if (isExpired) {
      return res.status(400).json({ message: "OTP Expired !!" });
    }

    const isTrue = user.verifyotp === otp;
    if (!isTrue) {
      return res.status(400).json({ message: "Invalid OTP  !!" });
    }
    user.isConfirmed = true;
    user.verifyotp = "";
    user.verifyotpExpAt = 0;
    await user.save();
    res
      .status(200)
      .json({ message: "Email verified successfully.You can login now.!!" });
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
    return res
      .status(400)
      .json({
        message: "OTP already sent. Please wait before requesting a new one.",
      });
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpAt = Date.now() + 10 * 60 * 1000;
  const verifyOTP = otp.toString();
  user.verifyotp = verifyOTP;
  user.verifyotpExpAt = otpExpAt;
  await user.save();
  //SENDING OTP  FOR EMAIL CONFIRMATON
  const mailOptions = {
    from: process.env.SMTP_SENDER,
    to: email,
    subject: "Email Verification OTP",
    text: `Your OTP for email verification is: ${verifyOTP}. It is valid for 10 minutes.`,
  };
  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: "OTP  Resent  !!" });
};

//  RESET  PASSWORD  OR FORGOT PASSWORD

const resetOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required !!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found !!" });
    }
    if (user.resetOtpExpAt > Date.now()) {
      return res.status(400).json({
        message:
          "A valid verification code already exists. Please use it or wait until it expires before requesting a new one.",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpAt = Date.now() + 10 * 60 * 1000;
    const resetOtp = otp.toString();
    user.resetOtp = resetOtp;
    user.resetOtpExpAt = otpExpAt;
    await user.save();
    //SENDING OTP  FOR EMAIL CONFIRMATON
    const mailOptions = {
      from: process.env.SMTP_SENDER,
      to: email,
      subject: "Reset Password OTP",
      text: `Your OTP for reset password is: ${resetOtp}. It is valid for 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP  Resent  !!" });
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
    res
      .status(200)
      .json({
        message: "Email verified successfully.You can reset your password now.",
      });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!!!" });
  }
};

const resetPassword = async (req,res)=>{
    const {email,newPassword}= req.body;
    try {
        if(!email || !newPassword){
            return res.status(400).json({message:"All fields are required "});
        }
        const user = await User.findOne({email:email});
        if (!user){
            return res.status(400).json({message:'User not found!!'})
        }
        if(user.resetOtpConfirmed === false){
            return res.status(400).json({message:"RESET OTP is not verified"});
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        user.resetOtpConfirmed = false;
        await user.save();
const mailOptions = {
  from: process.env.SMTP_SENDER,
  to: email,
  subject: "Password Reset Successful",
  html: `
    <!doctype html>
    <html>
      <body style="background:#f9fafb;font-family:sans-serif;padding:20px;">
        <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          <h1 style="margin-top:0;color:#111827;font-size:20px;">Password Reset Successful</h1>
          <p style="color:#374151;line-height:1.5;">
            Hi there,
          </p>
          <p style="color:#374151;line-height:1.5;">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <p style="color:#374151;line-height:1.5;">
            If you didn't request this change, you can safely ignore this email.
          </p>
          <div style="text-align:center;margin-top:20px;">
            <a href="${process.env.FRONTEND_URL}/login" style="display:inline-block;background:#3b82f6;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;">
              Sign in to your account
            </a>
          </div>
        </div>
      </body>
    </html>
  `
};
await transporter.sendMail(mailOptions);
        return res.status(200).json({message:"Password reset successful. You can login now."})  
        
    } catch (error) {
        return res.status(500).json({ message: "Server Error!!!" });
        
    }

}

module.exports = { register, verifyOTP, resendOTP ,resetOTP , verifyResetOTP ,resetPassword};
