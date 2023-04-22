"use strict";"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var processPID = process.pid;
var port = process.env.APP_PORT;
var server = app_1.default.listen(port, function () {
    console.log("I'm running at: ", port);
    console.log("processPID", processPID);
});
process.on("SIGTERM", function () {
    console.log("Server ending", new Date().toISOString());
    server.close(function () { return process.exit(); });
});
