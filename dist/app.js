"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv').config();

require('./database');
// Routes
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _compression = require('compression'); var _compression2 = _interopRequireDefault(_compression);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _home = require('./routes/home'); var _home2 = _interopRequireDefault(_home);
var _cardapio = require('./routes/cardapio'); var _cardapio2 = _interopRequireDefault(_cardapio);
var _user = require('./routes/user'); var _user2 = _interopRequireDefault(_user);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _frequencia = require('./routes/frequencia'); var _frequencia2 = _interopRequireDefault(_frequencia);
var _school = require('./routes/school'); var _school2 = _interopRequireDefault(_school);
var _request = require('./routes/request'); var _request2 = _interopRequireDefault(_request);

const express = require('express');

const whitelist = ['http://192.168.1.6:5173'];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS me'));
    }
  },
};
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_compression2.default.call(void 0, ));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", _home2.default);
    this.app.use("/token/", _tokenRoutes2.default);
    this.app.use("/cardapio/", _cardapio2.default);
    this.app.use("/users/", _user2.default);
    this.app.use("/frequencia/", _frequencia2.default);
    this.app.use("/school/", _school2.default);
    this.app.use("/requests/", _request2.default);
  }
}

exports. default = new App().app;
