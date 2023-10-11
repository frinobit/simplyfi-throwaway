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
  const agentId = "b03b75ce-7557-462e-ba01-57804c28847c";
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
      console.log(response[0].queryResult.responseMessages[0].text.text[0]);
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

  //   // LOGIC
  //   const intent = responses[0].queryResult.intent.displayName;
  //   const parameters = responses[0].queryResult.parameters;

  //   if (intent === "update-name - context: ongoing-update-profile") {
  //     const name = parameters.fields["given-name"].stringValue;

  //     // edit user using api
  //     const requestData = {
  //       name: name,
  //       user_id: user_id,
  //     };
  //     const headers = { Authorization: authorization };
  //     const personal_data = await Personal.findOne({ user_id });
  //     const personal_id = personal_data._id;
  //     const apiUrl = `${process.env.BACKEND_URL}/api/personals/${personal_id}`;
  //     axios
  //       .patch(apiUrl, requestData, { headers })
  //       // .then((response) => {
  //       //   console.log("Personal record updated:", response.data);
  //       // })
  //       .catch((error) => {
  //         console.error("API Error:", error.message);
  //       });

  //     // socket - send message to frontend that user info updated
  //     const message = { message: "A POST request was done!" };
  //     socketIo.emit("post_request_done", message);
  //   }

  return botResponses;
};

module.exports = { processMessage };