import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";

let socketIo;

const initSocket = (server) => {
  socketIo = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });

  socketIo.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
  });

  server.listen(process.env.WS_PORT, () => {
    console.log("WS server started on port", process.env.WS_PORT);
  });

  return socketIo;
};

const getSocketIo = () => socketIo;

export { initSocket, getSocketIo };
