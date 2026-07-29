import express from "express";
import cors from "cors"; //cors config
import cookieParser from "cookie-parser"; //doing cookie phase 3
import { corsOptions } from "./config/corsConfig.js"; //cors config
import passport from "./config/passport.js"; //phase 4 google login
import authRoutes from "./auth/auth.route.js";
import userRoutes from "./user/user.route.js";
import documentsRoutes from "./documents/documents.route.js"
import sessionsRoutes from "./sessions/sessions.route.js"
const app = express();
app.use(cors(corsOptions)); //cors config
app.use(cookieParser()); //phase 3 cookies
app.use(express.json()); //cors config
app.use(passport.initialize()); //phase 3 google
app.use(express.urlencoded({ extended: true })); //cors config
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/documents", documentsRoutes)
app.use("/api/sessions", sessionsRoutes)
export default app;