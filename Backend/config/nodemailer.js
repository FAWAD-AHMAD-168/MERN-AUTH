// nodemailer.js
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const chalk = require("chalk");
dotenv.config();

// Brevo SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Optional: verify connection on startup
transporter.verify((error) => {
  if (error) {
    console.error("Error connecting to SMTP server:", error);
  } else {
    console.log(
      chalk.magenta("✅ Brevo SMTP server is ready to take messages")
    );
  }
});

module.exports = transporter;
