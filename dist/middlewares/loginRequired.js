"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ errors: ['Faça login para continuar'] });

  const [, token] = authorization.split(' ');

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const {
      id, email,
    } = dados;

    const user = await _User2.default.findOne({ where: { id, email } });
    let schoolUser;
    if (!user) schoolUser = await _School2.default.findOne({ where: { id, email } });
    if (!user && !schoolUser) return res.status(401).json({ errors: ['Faça login novamente'] });

    if (user) {
      req.user = {
        Id: user.id,
        Email: user.email,
        Nome: user.nome,
        Sobrenome: user.sobrenome,
        Level: user.level,
        School_id: user.school_id,
      };
    }
    if (schoolUser) {
      req.user = {
        Id: schoolUser.id,
        Email: schoolUser.email,
        Nome: schoolUser.name,
        Cnpj: schoolUser.cnpj,
        Level: 3,
        School_id: schoolUser.id,
      };
    }
    return next();
  } catch (e) { return res.status(401).json({ errors: ['Permissão inválida'] }); }
};
