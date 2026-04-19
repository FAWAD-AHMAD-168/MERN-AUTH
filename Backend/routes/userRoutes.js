import express from "express";
const router = express.Router();

import { getUserData } from "../controllers/userControllers.js";
import authenticateUser from "../middlewares/authenticateUser.js";
router.get("/user-data",authenticateUser, getUserData);

export default router;