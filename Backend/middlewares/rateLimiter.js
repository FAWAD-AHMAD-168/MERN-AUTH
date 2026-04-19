import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  message:
    "Too many attempts, please wait for 15 minutes before trying again later.",
});

export default loginLimiter;
