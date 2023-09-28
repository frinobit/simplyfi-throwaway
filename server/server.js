require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const financialRoutes = require("./routes/financials");
const goalRoutes = require("./routes/goals");
const personalRoutes = require("./routes/personals");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

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

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
    // socket.to(data.room).emit("receive_message", data);
  });

  socketIo = io;
});

server.listen(process.env.WS_PORT, () => {
  console.log("WS server started on port", process.env.WS_PORT);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/financials", financialRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/personals", personalRoutes);

// dialogflow
app.post("/dialogflow", (req, res) => {
  const payload = req.body;

  const intent = payload.queryResult.intent.displayName;
  const parameters = payload.queryResult.parameters;

  if (intent === "update-name - context: ongoing-update-profile") {
    const name = parameters["given-name"];
    const fulfillmentText = `webhook - The name of ${name} is okay`;
    const response = { fulfillmentText };

    res.status(200).json(response);
  }
  const message = { message: "A POST request was done!" };
  if (socketIo) {
    socketIo.emit("post_request_done", message);
  } else {
    console.log("socket io is not initialised");
  }
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.HTTP_PORT, () => {
      console.log(
        "Connected to db and HTTP server started on port",
        process.env.HTTP_PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
