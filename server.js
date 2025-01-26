import app from "./app.js";

export const start = (port) => {
  app.listen(port, "0.0.0.0", () => {
    console.log("Server running on port", port);
  });
};
