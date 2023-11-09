const express = require("express");

// chatbot functions
const {
  getOpenai,
  getStartConversation,
  getGenerateSummary,
} = require("../openai/openaiRouter");

// require auth for all personal routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// normal route
router.post("/", getOpenai);

// normal route
router.post("/start_conversation", getStartConversation);

// normal route
router.post("/generate_summary", getGenerateSummary);

module.exports = router;
