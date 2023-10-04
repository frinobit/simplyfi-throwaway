const express = require("express");
const app = express();
const axios = require("axios");
const admin = require("firebase-admin");

const Personal = require("./models/personalModel");

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
let user_id;
let user_token;

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // testing
  socket.on("send_message", (data) => {
    socket.emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
    // socket.to(data.room).emit("receive_message", data);
  });

  // get token from frontend then decode to get user_id
  socket.on("user_info", async (data) => {
    user_token = data.user.token;

    const decodedToken = await admin.auth().verifyIdToken(user_token);
    user_id = decodedToken.user_id;
  });

  socketIo = io;
});

server.listen(process.env.WS_PORT, () => {
  console.log("WS server started on port", process.env.WS_PORT);
});

// dialogflow
app.post("/dialogflow", async (req, res) => {
  const payload = req.body;

  const intent = payload.queryResult.intent.displayName;
  const parameters = payload.queryResult.parameters;

  if (intent === "update-name - context: ongoing-update-profile") {
    const name = parameters["given-name"];
    const fulfillmentText = `webhook - The name of ${name} is okay`;
    const response = { fulfillmentText };

    res.status(200).json(response);

    // edit user using api
    const requestData = {
      name: name,
      user_id: user_id,
    };
    const headers = {
      Authorization: `Bearer ${user_token}`,
    };
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

    // testing
    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  }
});

module.exports = app;
