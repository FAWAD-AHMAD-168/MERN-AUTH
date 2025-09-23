// server.js
const express = require('express');
const chalk = require('chalk');
const dotenv =  require("dotenv");
const connectDB = require('./config/db');
const app = express();
dotenv.config();
connectDB();

const authRoutes = require("./routes/authRoutes")


app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message:"JEEVY TU MAJAA"
    });
});

app.use("/api/auth",authRoutes)



const PORT = 3000;
app.listen(PORT, () => {
  
  console.log(chalk.yellow.bold(`✅ Server running at http://localhost:${process.env.PORT}`));
});
