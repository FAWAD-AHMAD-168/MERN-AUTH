// db.js
const mongoose = require('mongoose');
const chalk = require('chalk'); // import chalk
require('dotenv').config();

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(chalk.blue.bold('✅ MongoDB Connected Successfully'));
  } catch (err) {
    console.log(chalk.red.bold('❌ MongoDB Connection Error: '), err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
