const { Server } = require("socket.io");

function socketSetup(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // socket.on("join_room", (data) => {
    //   socket.join(data);
    // });

    socket.on("send_message", (data) => {
      socket.emit("receive_message", data);
      socket.broadcast.emit("receive_message", data);
      // socket.to(data.room).emit("receive_message", data);
    });

    socket.on("send_message_to_clients", (message) => {
      socket.emit("post_request_done", message);
    });
  });
}

module.exports = socketSetup;
