"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  try {
    if (req.user.Level < 2) return res.status(401).json("Invalid permission");
    return next();
  } catch (e) { return res.status(401).json({ errors: ['Permissão inválida'] }); }
};
