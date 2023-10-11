const express = require("express");
const router = express.Router();

// Check authorization first
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// Import methods from dialogflow module
const dialogflow = require("./dialogflowLogicCX");
const { processMessage } = dialogflow;

const getDialogflow = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const user_id = req.user.user_id;
    console.log("1. user_id:", user_id);
    const userMessage = req.body.message;
    console.log("2. receive in POST:", userMessage);

    // Send the user's message to Dialogflow for processing using processMessage function
    const botResponses = await processMessage(
      [userMessage],
      user_id,
      authorization
    ); // Pass the user message as an array
    console.log("3. bot response:", botResponses[0]);

    res.status(200).json({ message: botResponses[0] }); // Return the first response (assuming it's a single message)
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getDialogflow };
