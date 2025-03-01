import express from "express";
import { upload } from "../utils/uploader.js";
import { uploadFile } from "../controllers/uploads.controller.js";

const router = express.Router();

router.post("/", upload.single("file"), uploadFile);

export default router;
