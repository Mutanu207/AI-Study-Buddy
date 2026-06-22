import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsConfig.js";
import passport from "./config/passport.js";
import authRoutes from "./auth/auth.route.js";
import userRoutes from "./user/user.route.js";
import documentsRoutes from "./documents/documents.route.js"
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/documents", documentsRoutes)
export default app;