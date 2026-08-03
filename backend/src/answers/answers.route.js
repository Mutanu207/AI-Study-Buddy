import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { saveAnswers } from "./answers.contorller.js";
const router = express.Router();
router.post("/save",verifyToken, saveAnswers);
export default router;