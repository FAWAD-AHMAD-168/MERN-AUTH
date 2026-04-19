// server.js
import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);



import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.get("/", (req, res) => {
  res.json({
    message: "A Complete MERN Authentication System",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    chalk.yellow.bold(
      `✅ Server is walking  at http://localhost:${process.env.PORT}`,
    ),
  );
});
