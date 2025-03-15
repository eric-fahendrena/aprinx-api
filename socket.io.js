import { Server } from "socket.io";
import { handleNotification } from "./sockets/notification.socket.js";
import { handleCommentsSocket } from "./sockets/comment.socket.js";
import { handleLikesSocket } from "./sockets/like.socket.js";

let io;

export function initSocket(server) {
  console.log("Socket initialization");
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN,
      methods: ["GET", "POST"],
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    handleNotification(io, socket);
    handleCommentsSocket(io, socket);
    handleLikesSocket(io, socket);
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    })
  });
}

export function getIo() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}
