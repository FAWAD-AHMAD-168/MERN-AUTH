const jwt = require ("jsonwebtoken");
const userAuth= (req,res,next )=>{
    const token = req.cookies.token;
if (!token){
    return res.status(401).json({message:"Unauthorized !! Login again to continue "})
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded.email;
    next();
    
} catch (error) {
        return res.status(401).json({ message: "Token is invalid or expired" });
}

}

module.exports = userAuth;
