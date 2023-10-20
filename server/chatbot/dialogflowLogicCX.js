const express = require("express");
const app = express();
const dialogflow = require("@google-cloud/dialogflow-cx");

// utils
const { updateName } = require("./chatbotUtils/updateName");
const { updateIncome } = require("./chatbotUtils/updateIncome");
const { updateFixed } = require("./chatbotUtils/updateFixed");

// socket
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

let socketIo;

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socketIo = io;
});

server.listen(process.env.WS_PORT, () => {
  console.log("WS server started on port", process.env.WS_PORT);
});

const sessionClient = new dialogflow.SessionsClient();

// Keeping the context across queries to simulate an ongoing conversation
let context = [];

const processMessage = async (queries, user_id, authorization) => {
  const projectId = "testing-simplyask-npfp";
  const location = "global";
  const agentId = "526625c3-d9c8-4201-a6f9-c9fd3e204864";
  const languageCode = "en";
  const sessionId = user_id;

  const sessionPath = sessionClient.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );
  const responses = [];

  for (const userMessage of queries) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: userMessage,
        },
        languageCode: languageCode,
      },
      queryParams: {
        contexts: context || [], // Use the existing context from previous queries
      },
    };

    try {
      const response = await sessionClient.detectIntent(request);
      try {
        const intent = response[0].queryResult.match.intent.displayName;
        const parameters = response[0].queryResult.parameters;

        parts = intent.split(".");
        action = parts[0] + "." + parts[1];
        description = parts[2];

        if (action === "provides.name") {
          result = updateName(socketIo, parameters, user_id, authorization);
        }
        if (action === "provides.income") {
          result = updateIncome(
            socketIo,
            parameters,
            user_id,
            authorization,
            description
          );
        }
        if (action === "provides.expenses") {
          result = updateFixed(socketIo, parameters, user_id, authorization);
        }
      } catch (error) {
        console.log(
          "Error processing message (processMessage1):",
          error.message
        );
      }

      responses.push(response[0]);
      context = response[0].queryResult.outputContexts;
    } catch (error) {
      console.log("Error processing message (processMessage2):", error.message);
    }
  }

  // Extract fulfillment text from responses
  const botResponses = responses.map(
    (response) => response.queryResult.responseMessages[0].text.text[0]
  );

  return botResponses;
};

// Function to initiate a conversation
const startConversation = () => {
  return "Hey there! 🍓 Before we blend your finances into a smooth overview, let's start by understanding your income. Take a sip, relax, and let's go through it step by step. Remember, if anything seems unclear or if you're unsure about any details, I'm right here to help you out!\n\nWhen you are ready, please type 'ready'";
};

module.exports = { processMessage, startConversation };
