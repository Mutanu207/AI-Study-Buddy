import { userSessions,displaySessions, fetchUserSession } from "./sessions.controller.js";
import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/create",verifyToken, userSessions)
router.get("/fetch",verifyToken, displaySessions)
router.get("/userSession/:sessionId", verifyToken, fetchUserSession)
export default router;