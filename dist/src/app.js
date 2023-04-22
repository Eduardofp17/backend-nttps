"use strict";"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("./database");
// Routes
var cors_1 = require("cors");
var compression_1 = require("compression");
var helmet_1 = require("helmet");
var home_1 = require("./routes/home");
var cardapio_1 = require("./routes/cardapio");
var user_1 = require("./routes/user");
var tokenRoutes_1 = require("./routes/tokenRoutes");
var frequencia_1 = require("./routes/frequencia");
var school_1 = require("./routes/school");
var request_1 = require("./routes/request");
var email_1 = require("./routes/email");
var express = require('express');
var whitelist = ["http://localhost:5173", "https://nourishnet.net"];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    App.prototype.middlewares = function () {
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    };
    App.prototype.routes = function () {
        this.app.use("/", home_1.default);
        this.app.use("/token/", tokenRoutes_1.default);
        this.app.use("/cardapio/", cardapio_1.default);
        this.app.use("/users/", user_1.default);
        this.app.use("/frequencia/", frequencia_1.default);
        this.app.use("/school/", school_1.default);
        this.app.use("/requests/", request_1.default);
        this.app.use("/email/", email_1.default);
        // Load test
        this.app.use("/loaderio-2ce44c64675215a24a8f093a9658d518/", function (req, res) {
            res.send("loaderio-2ce44c64675215a24a8f093a9658d518");
        });
    };
    return App;
}());
exports.default = new App().app;
