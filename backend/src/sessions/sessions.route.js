import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/create",verifyToken, userSessions)
export default router;