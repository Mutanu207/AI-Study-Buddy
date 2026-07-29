import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { fetchUsername, updateProfile } from "./user.controller.js";
const router = express.Router();
router.get("/me", verifyToken, fetchUsername);
router.post("/update", verifyToken, updateProfile)
export default router;