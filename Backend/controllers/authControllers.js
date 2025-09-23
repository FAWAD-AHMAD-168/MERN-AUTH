const bcrypt = require("bcrypt");
const User = require ( "../models/userModel.js");
 const transporter = require("../config/nodemailer.js");

const register = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required !!"})
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists !!"})
    }
        const usernameExists = await User.findOne({username});
    if(usernameExists){
        return res.status(400).json({message:"Choose a different username !!"})
    }

    const hashedPassword = await bcrypt.hash(password,10);

    //GENERATING AN OTP 
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpAt = Date.now() + 10 * 60 * 1000;
    const verifyOTP= otp.toString();

    //SENDING OTP  FOR EMAIL CONFIRMATON 
    const mailOptions = {
        from: process.env.SMTP_SENDER,
        to: email,
        subject: 'Email Verification OTP',
        text: `Your OTP for email verification is: ${verifyOTP}. It is valid for 10 minutes.`   
    };

    await transporter.sendMail(mailOptions);

    const newUser= new User({
        username,
        email,
        password:hashedPassword,
        verifyotp:verifyOTP,
        verifyotpExpAt:otpExpAt
    });
    await newUser.save();
    res.status(201).json({message:"REGISTERED AND OTP SENT for email verification!!"})
}
catch (error) {
    res.status(500).json({message:"Server Error"})

}

    
}


const verifyOTP = async (req,res)=>{
    const {email,otp} = req.body;
     try{
        if(!email || !otp){
            return res.status(400).json({message:"All fields are required !!"})
        }   
        const  user = await User.findOne({email:email })
        if(!user){
            return res.status(400).json({message:"User not found !!"})
        }
        // const isTrue = user.verifyotp === otp  && user.verifyotpExpAt > Date.now();

                 const isExpired = user.verifyotpExpAt < Date.now();
            if(isExpired){
                return res.status(400).json({message:"OTP Expired !!"})
            }

        const isTrue = user.verifyotp === otp;
        if(!isTrue){
            return res.status(400).json({message:"Invalid OTP  !!"})
        }
        user.isConfirmed = true;
        user.verifyotp = "";
        user.verifyotpExpAt = 0;
        await user.save();
        res.status(200).json({message:"Email verified successfully oon khul ke pen yawao  !!"})



     }
     catch(error){

     }
}
module.exports = {register,verifyOTP};