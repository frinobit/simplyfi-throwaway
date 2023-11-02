const express = require("express");
const router = express.Router();

const Deepdive = require("../models/deepdiveModel");

// Check authorization first
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// Import methods from openai module
const { processMessage, startConversation } = require("./openaiLogic");

const store_message = async (user_id, content, is_user_message) => {
  const messageDocument = new Deepdive({
    user_id: user_id,
    content: content,
    is_user_message: is_user_message,
  });
  await messageDocument.save();
};

const getOpenai = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const user_id = req.user.user_id;
    console.log("1. user_id:", user_id);
    const userMessage = req.body.message;
    console.log("2. receive in POST:", userMessage);

    // Save to database
    await store_message(user_id, userMessage, true);

    // Send the user's message to Openai for processing using processMessage function
    const botResponses = await processMessage(
      userMessage,
      user_id,
      authorization
    );
    console.log("3. bot response:", botResponses);

    // Save to database
    await store_message(user_id, botResponses, false);

    res.status(200).json({ message: botResponses });
  } catch (error) {
    console.log("Error processing message (getOpenai):", error);
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

module.exports = { getOpenai, getStartConversation };
