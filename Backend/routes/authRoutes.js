const express = require ("express");
const router = express.Router();
const {register,verifyOTP} = require("../controllers/authControllers.js");


    router.post("/register" , register)
    router.post("/verify-otp" , verifyOTP)



module.exports = router