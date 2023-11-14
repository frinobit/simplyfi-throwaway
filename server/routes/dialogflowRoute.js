import express from "express";

// chatbot functions
import {
  getDialogflow,
  getStartConversation,
} from "../chatbot/dialogflowRouter.js";

// require auth for all personal routes
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// normal route
router.post("/", getDialogflow);

// normal route
router.post("/start_conversation", getStartConversation);
