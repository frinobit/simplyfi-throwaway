const express = require("express");
const app = express();

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

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
    // socket.to(data.room).emit("receive_message", data);
  });

  socket.once("user_info", async (data) => {
    const email = data.user.email;
    const user = await User.findOne({ email });
    user_id = user._id;
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

    // create user
    await Personal.create({
      name,
      user_id,
    });

    // testing
    const message = { message: "A POST request was done!" };
    socketIo.emit("post_request_done", message);
  }
});

module.exports = app;
