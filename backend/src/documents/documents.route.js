import express from "express"
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "./multer.config.js";
import { uploadPdf } from "./documents.controller.js";
const router = express.Router();
router.post("/upload",verifyToken,upload.single("pdf"),uploadPdf)
export default router