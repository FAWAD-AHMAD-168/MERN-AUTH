const User = require("../models/userModel.js");

const getUserData = async (req,res)=>{
    try {
        const email = req.user;
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({message:"User Not Found !!"})
        }
        return res.status(200).json({
            sucess:true,
            userData:{
                name:user.username,
                email:user.email,
                isConfirmed:user.isConfirmed
            }
        })
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

module.exports = {getUserData}