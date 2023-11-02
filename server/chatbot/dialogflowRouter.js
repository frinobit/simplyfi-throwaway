const express = require("express");
const router = express.Router();

const Message = require("../models/messageModel");

// Check authorization first
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// Import methods from dialogflow module
// const dialogflow = require("./dialogflowLogicES");
const dialogflow = require("./dialogflowLogicCX");
const { processMessage, startConversation } = dialogflow;

const store_message = async (user_id, content, is_user_message) => {
  const messageDocument = new Message({
    user_id: user_id,
    content: content,
    is_user_message: is_user_message,
  });
  await messageDocument.save();
};

const getDialogflow = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const user_id = req.user.user_id;
    console.log("1. user_id:", user_id);
    const userMessage = req.body.message;
    console.log("2. receive in POST:", userMessage);

    // Save to database
    await store_message(user_id, userMessage, true);

    // Send the user's message to Dialogflow for processing using processMessage function
    const botResponses = await processMessage(
      [userMessage],
      user_id,
      authorization
    ); // Pass the user message as an array
    console.log("3. bot response:", botResponses[0]);

    // Save to database
    await store_message(user_id, botResponses[0], false);

    res.status(200).json({ message: botResponses[0] }); // Return the first response (assuming it's a single message)
  } catch (error) {
    console.log("Error processing message (getDialogflow):", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStartConversation = (req, res) => {
  try {
    const { authorization } = req.headers;
    const user_id = req.user.user_id;

    // Call startConversation to initiate the conversation
    const botResponse = startConversation(user_id, authorization);

    res.status(200).json({ message: botResponse });
  } catch (error) {
    console.log("Error starting conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getDialogflow, getStartConversation };
