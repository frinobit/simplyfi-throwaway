import express from "express";
const app = express();
import dialogflow from "@google-cloud/dialogflow";

import axios from "axios";
import { Personal } from "../models/personalModel.js";

// socket
import http from "http";
import { Server } from "socket.io";
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

export const processMessage = async (queries, user_id, authorization) => {
  const projectId = "testing-simplyask-npfp";
  const sessionId = user_id;
  const languageCode = "en";

  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );
  const responses = [];

  for (const userMessage of queries) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: userMessage,
          languageCode: languageCode,
        },
      },
      queryParams: {
        contexts: context || [], // Use the existing context from previous queries
      },
    };

    try {
      const response = await sessionClient.detectIntent(request);
      responses.push(response[0]);
      context = response[0].queryResult.outputContexts;
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }

  // Extract fulfillment text from responses
  const botResponses = responses.map(
    (response) => response.queryResult.fulfillmentText
  );

  // LOGIC
  const intent = responses[0].queryResult.intent.displayName;
  const parameters = responses[0].queryResult.parameters;

  if (intent === "update-name - context: ongoing-update-profile") {
    const name = parameters.fields["given-name"].stringValue;

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

    // socket - send message to frontend that user info updated
    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  }

  return botResponses;
};

export const getStartConversation = (req, res) => {
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
