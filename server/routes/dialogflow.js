const express = require("express");

// chatbot functions
const {
  getDialogflow,
  getStartConversation,
} = require("../chatbot/dialogflowRouter");

// require auth for all personal routes
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// normal route
router.post("/", getDialogflow);

// normal route
router.post("/start-conversation", getStartConversation);

module.exports = router;
