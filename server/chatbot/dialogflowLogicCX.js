const express = require("express");
const app = express();
const dialogflow = require("@google-cloud/dialogflow-cx");

const axios = require("axios");
const Personal = require("../models/personalModel");

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
        // console.log(response[0].queryResult.match.intent.displayName);
        //   console.log(
        //     response[0].queryResult.parameters.fields.person.structValue.fields
        //       .original.stringValue
        //   );
        //   console.log(
        //     response[0].queryResult.parameters.fields.email.stringValue
        //   );
        //   console.log(
        //     response[0].queryResult.parameters.fields.number.numberValue
        //   );
        // LOGIC
        const intent = response[0].queryResult.match.intent.displayName;
        const parameters = response[0].queryResult.parameters;

        if (intent === "provides.name") {
          const name =
            parameters.fields.person.structValue.fields.original.stringValue;

          // edit user using api
          const requestData = {
            name: name,
            user_id: user_id,
          };
          const headers = { Authorization: authorization };
          const personal_data = await Personal.findOne({ user_id });
          const personal_id = personal_data._id;
          const apiUrl = `${process.env.BACKEND_URL}/api/personals/${personal_id}`;
          axios
            .patch(apiUrl, requestData, { headers })
            // .then((response) => {
            //   console.log("Personal record updated:", response.data);
            // })
            .catch((error) => {
              console.error("API Error:", error.message);
            });

          // // socket - send message to frontend that user info updated
          // const message = { message: "A POST request was done!" };
          // socketIo.emit("post_request_done", message);
        }
      } catch (error) {
        console.error("Error processing message:", error.message);
      }
      responses.push(response[0]);
      context = response[0].queryResult.outputContexts;
    } catch (error) {
      console.error("Error processing message:", error);
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
