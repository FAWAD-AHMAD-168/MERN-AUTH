// server.js
const express = require('express');
const chalk = require('chalk');
const dotenv =  require("dotenv");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');

const app = express();
dotenv.config();
connectDB();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        message:"MERN AUTH APP "
    });
});

app.use("/api/auth",authRoutes)
app.use("/api/user", userRoutes)



const PORT = 3000;
app.listen(PORT, () => {
  
  console.log(chalk.yellow.bold(`✅ Server running at http://localhost:${process.env.PORT}`));
});
