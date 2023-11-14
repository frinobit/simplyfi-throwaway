import express from "express";

// chatbot functions
import {
  getOpenai,
  getStartConversation,
  getGenerateSummary,
} from "../openai/openaiRouter.js";

// require auth for all personal routes
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// normal route
router.post("/", getOpenai);

// normal route
router.post("/start_conversation", getStartConversation);

// normal route
router.post("/generate_summary", getGenerateSummary);
