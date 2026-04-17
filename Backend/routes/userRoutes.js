import express from "express";
const router = express.Router();

import { getUserData } from "../controllers/userControllers.js";
import userAuth from "../middlewares/userAuth.js";

router.get("/user-data", userAuth, getUserData);

export default router;