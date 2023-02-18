"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

const processPID = process.pid;
const port = process.env.APP_PORT;

const server = _app2.default.listen(port, () => {
  console.log("I'm running at: ", port);
  console.log("processPID", processPID);
});
process.on("SIGTERM", () => {
  console.log("Server ending", new Date().toISOString());
  server.close(() => process.exit());
});
