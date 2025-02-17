import app from "./app.js";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);

export const io = new Server(server);

export const start = (port) => {
  app.listen(port, "0.0.0.0", () => {
    console.log("Server running on port", port);
  });
};
