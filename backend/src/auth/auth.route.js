import express from "express";
import { register, login, refreshAccessToken, logout } from "./auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);
export default router;