import app from "./app";

const processPID = process.pid;
const port = process.env.APP_PORT;

const server = app.listen(port, () => {
  console.log("I'm running at: ", port);
  console.log("processPID", processPID);
});
process.on("SIGTERM", () => {
  console.log("Server ending", new Date().toISOString());
  server.close(() => process.exit());
});
