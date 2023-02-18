"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _jwtEmail = require('../utils/jwtEmail'); var _jwtEmail2 = _interopRequireDefault(_jwtEmail);
var _sendEmail = require('../utils/sendEmail'); var _sendEmail2 = _interopRequireDefault(_sendEmail);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);

class UserController {
  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ where: { school_id: req.user.School_id } }, { attributes: ['id', 'nome', 'sobrenome', 'email', 'level'] });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // async create(req, res) {
  //   try {
  //     const newUser = await User.create(req.body);

  //     const {
  //       id, nome, sobrenome, email, level,
  //     } = newUser;

  //     return res.json({
  //       id, nome, sobrenome, email, level,
  //     });
  //   } catch (e) {
  //     return res.status(400).json({
  //       errors: e.errors.map((err) => err.message),
  //     });
  //   }
  // }

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) return res.status(400).json({ errors: ['Usuário não existe'] });
      await user.update(req.body);
      return res.json({
        updated: true,
        theDoc: { user },
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async redefinePass(req, res) {
    try {
      if (!req.body.email) return res.status(400).json("Please type the email");
      const user = await _User2.default.findOne({ where: { email: req.body.email } });
      let schoolUser;
      if (!user) schoolUser = await _School2.default.findOne({ where: { email: req.body.email } });
      if (!user && !schoolUser) return res.status(422).json("User doesn't exist");
      let token;
      if (user) {
        token = await _jwtEmail2.default.create(user.id, user.email);
      }
      if (schoolUser) {
        token = await _jwtEmail2.default.create(schoolUser.id, schoolUser.email);
      }
      const link = `${process.env.APP_URL}:${process.env.APP_PORT}/users/redefine/${token}`;
      if (user) {
        await _sendEmail2.default.call(void 0, user.email, "Enviamos um email para você, clicando no link você poderá redefinir sua senha", link);
      }
      if (schoolUser) {
        await _sendEmail2.default.call(void 0, schoolUser.email, "Enviamos um email para você, clicando no link você poderá redefinir sua senha", link);
      }
      return res.status(200).json("Email successfully sent");
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async redefinePassword(req, res) {
    try {
      const dados = _jsonwebtoken2.default.verify(req.params.id, process.env.TOKEN_SECRET);
      const {
        id, email,
      } = dados;
      const user = await _User2.default.findByPk(id);
      let schoolUser;
      if (!user) schoolUser = await _School2.default.findByPk(id);
      if (!user && !schoolUser) return res.status(400).json("User doesn't exist");
      if (!req.body.password) return res.status(400).json("Please type the new password");
      if (user) {
        await user.update({ password: req.body.password });
      }
      if (schoolUser) {
        await schoolUser.update({ password: req.body.password });
      }
      return res.status(200).json("Password redefined");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }
}

exports. default = new UserController();
