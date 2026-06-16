import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { fetchUsername } from "./user.controller.js";
const router = express.Router();
router.get("/me", verifyToken, fetchUsername);
export default router;