import express from "express";
import { chatWithAI } from "../controllers/chatController.js";

const router = express.Router();

// ✅ IMPORTANT: correct route
router.post("/", chatWithAI);

export default router;
