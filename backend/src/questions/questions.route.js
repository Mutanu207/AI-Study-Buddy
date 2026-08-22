import express from "express";
import { getUserQuestions } from "./questions.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/fetch/:sessionId",verifyToken, getUserQuestions);
export default router;