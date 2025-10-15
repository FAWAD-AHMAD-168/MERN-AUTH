const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(chalk.blue.bold('✅ MongoDB Connected Successfully'));
  } catch (err) {
    console.log(chalk.red.bold('❌ MongoDB Connection Error:'), err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
