import express from "express";
import { corsOptions } from "./config/corsConfig";
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;