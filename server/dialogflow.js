const express = require("express");
const app = express();
const axios = require("axios");

const Personal = require("./models/personalModel");
const User = require("./models/userModel");

// socket
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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

  // get user id from frontend
  socket.once("user_info", async (data) => {
    const email = data.user.email;
    const user_data = await User.findOne({ email });
    user_id = user_data._id;

    user_token = data.user.token;
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

    // create user using api
    const requestData = {
      name: name,
      user_id: user_id,
    };
    const headers = {
      Authorization: `Bearer ${user_token}`,
    };
    const apiUrl = "http://localhost:4000/api/personals";
    axios
      .post(apiUrl, requestData, { headers })
      .then((response) => {
        console.log("Personal record created:", response.data);
      })
      .catch((error) => {
        console.error("API Error:", error.message);
      });

    // testing
    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  }
});

module.exports = app;
