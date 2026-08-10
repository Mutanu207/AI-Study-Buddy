import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { fetchFeedback } from "./feedback.controller.js";
const router = express.Router();
router.get("/fetch/:sessionId",verifyToken, fetchFeedback);
export default router;