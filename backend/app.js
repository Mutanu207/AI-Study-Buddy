import express from "express";
import { corsOptions } from "./config/corsConfig";
import authRoutes from "./auth/auth.routes.js";
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
export default app;