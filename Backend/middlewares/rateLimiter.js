const rateLimit = require("express-rate-limit");
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 3, 
  message: "Too many  attempts, please wait for 15 minutes before trying again later."
});

module.exports= loginLimiter
