const express = require("express");
const router = express.Router();

// Check authorization first
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// Import methods from openai module
const {
  store_message,
  processMessage,
  startConversation,
} = require("./openaiLogic");

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
    const botResponses = await processMessage(userMessage, user_id);
    console.log("3. bot response:", botResponses);

    // Save to database
    await store_message(user_id, botResponses, false);

    res.status(200).json({ message: botResponses });
  } catch (error) {
    console.log("Error getOpenai:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStartConversation = (req, res) => {
  try {
    const { authorization } = req.headers;
    const user_id = req.user.user_id;

    // Call startConversation to initiate the conversation
    const botResponse = startConversation();

    res.status(200).json({ message: botResponse });
  } catch (error) {
    console.log("Error getStartConversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const { createPDF } = require("./createPDF");
const getGenerateSummary = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const user_id = req.user.user_id;

    const questions = [
      "1. Inclusions & exclusions\nQuestion: What am I covered for and not covered for under this policy?\n\nAnswer:\n",
      "2. How to manage risk\nQuestion: Are there any conditions that need to be met for the insurance to be valid?\n\nAnswer:\n",
      "3. Individual or overall limits\nQuestion: What are the limits or restrictions on what I can claim?\n\nAnswer:\n",
      "4. Waiting periods\nQuestion: Are there any waiting periods? \n\nAnswer:\n",
      "5. Premium costs & grace periods\nQuestion: How much does the premium cost? Does my insurer offer a grace period?\n\nAnswer:\n",
    ];
    const queryDescriptions = [
      "What am I covered for and not covered for under this policy?\nFormat the answer in such manner: What you are covered for:- (then a list) What you are not covered for:- (then a list)",
      "Are there any conditions that need to be met for the insurance to be valid?\nFormat the answer in such manner: The following conditions are to be met:- (then a list)",
      "What are the limits or restrictions on what I can claim?\nFormat the answer in such manner: Limits:- (then a list) Restrictions:- (then a list)",
      "Are there any waiting periods?\nFormat the answer in a list with bullet points",
      "How much does the premium cost? Does my insurer offer a grace period?\nFormat the answer in a list with bullet points",
    ];

    let response = "";
    response +=
      "Insurance policy summary\nSource: https://www.commbank.com.au/articles/insurance/what-to-look-for-in-an-insurance-policy.html\n\n";
    for (let i = 0; i < questions.length; i++) {
      response += questions[i];
      response += await processMessage(queryDescriptions[i], user_id);
      response += "\n\n";
    }

    await createPDF(user_id, response.replace(/\n/g, "%%%%%"));

    res.status(200).json({ message: response });
  } catch (error) {
    console.log("Error getGenerateSummary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getOpenai, getStartConversation, getGenerateSummary };
