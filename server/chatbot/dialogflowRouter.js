const express = require("express");
const bodyParser = require("body-parser");
const dialogflow = require("./dialogflow");

const router = express.Router();

// Middleware
router.use(bodyParser.json());

// Import the processMessage function from your dialogflow module
const { processMessage } = dialogflow;

router.post("/dialogflow", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("receive in POST: ", userMessage);

    // Send the user's message to Dialogflow for processing using processMessage function
    const botResponses = await processMessage([userMessage]); // Pass the user message as an array
    console.log("bot response: ", botResponses[0]);

    res.json({ message: botResponses[0] }); // Return the first response (assuming it's a single message)
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
