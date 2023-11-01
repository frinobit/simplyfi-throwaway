const express = require("express");

// chatbot functions
const { getOpenai, getStartConversation } = require("../openai/openaiRouter");

// require auth for all personal routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// normal route
router.post("/", getOpenai);

// normal route
router.post("/start_conversation", getStartConversation);

module.exports = router;
