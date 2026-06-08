import express from "express";
import { register, login, refreshAccessToken, logout, googleCallback } from "./auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import passport from "passport";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/google/callback", passport.authenticate("google", 
            { session: false, failureRedirect: "/login" }), googleCallback);
export default router;