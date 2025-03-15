import app from "./app.js";
import http from "http";
import { initSocket } from "./socket.io.js";

const server = http.createServer(app);
initSocket(server);

export const start = (port) => {
  server.listen(port, "0.0.0.0", () => {
    console.log("Server running on port", port);
  });
};
