import express from "express";
import { getPresignedUrl } from "../controllers/uploads.controller.js";

const router = express.Router();

router.get("/presigned-url", getPresignedUrl);

export default router;
