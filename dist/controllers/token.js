"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);

class TokenController {
  async create(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
    const user = await _User2.default.findOne({ where: { email } });
    let schoolUser;
    if (!user) schoolUser = await _School2.default.findOne({ where: { email } });
    if (!user && !schoolUser) return res.status(401).json({ errors: ['Usuário não existe'] });
    if (schoolUser) {
      if (!await
      schoolUser.passwordValid(password)) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
    }
    if (user) {
      if (!await user.passwordValid(password)) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
    }

    const { id } = user || schoolUser;

    const token = _jsonwebtoken2.default.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.send({ token });
  }
}

exports. default = new TokenController();
