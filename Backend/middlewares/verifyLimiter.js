import rateLimit from "express-rate-limit";

const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please wait 15 minutes before trying again later."
});

export default verifyLimiter;