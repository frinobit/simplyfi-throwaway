const express = require("express");
const app = express();
const dialogflow = require("@google-cloud/dialogflow-cx");

// utils
const { updateName } = require("./chatbotUtils/updateName");
const { handlePropertyAction } = require("./chatbotUtils/handlePropertyAction");
const { handleVehicleAction } = require("./chatbotUtils/handleVehicleAction");

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

const propertyCounts = {};
const vehicleCounts = {};

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

  if (!propertyCounts[user_id]) {
    propertyCounts[user_id] = 0;
  }
  if (!vehicleCounts[user_id]) {
    vehicleCounts[user_id] = 0;
  }

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
        action = parts[0] + "." + parts[1] + "." + parts[2];

        if (action === "provides.personal.name") {
          result = updateName(socketIo, parameters, user_id, authorization);
        }
        if (action.startsWith("provides.property.")) {
          handlePropertyAction(
            action,
            propertyCounts,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
        if (action.startsWith("provides.vehicle.")) {
          handleVehicleAction(
            action,
            vehicleCounts,
            socketIo,
            parameters,
            user_id,
            authorization
          );
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
  return "Hello there, financial explorer! 🍓 Ready to whip up a delicious blend of your finances? Grab your favorite smoothie, and let's dive in! And remember, if you ever get stuck, just give me a shout. Let's make this berry smooth!\n\nType 'ready' when you are ready!";
};

module.exports = { processMessage, startConversation };
