"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Request = require('../models/Request'); var _Request2 = _interopRequireDefault(_Request);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _jwtEmail = require('../utils/jwtEmail'); var _jwtEmail2 = _interopRequireDefault(_jwtEmail);
var _sendEmail = require('../utils/sendEmail'); var _sendEmail2 = _interopRequireDefault(_sendEmail);
var _UserAccept = require('../models/UserAccept'); var _UserAccept2 = _interopRequireDefault(_UserAccept);

class RequestsController {
  async index(req, res) {
    try {
      const requests = await _Request2.default.findAll({ where: { school_id: req.user.School_id } }, { attributes: ['id'] });
      return res.status(200).json(requests);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    try {
      if (!req.body.code) return res.status(400).json({ created: false, msg: "Please fill the field with an code" });

      const school = await _School2.default.findOne({ where: { code: req.body.code } });
      if (!school) return res.status(400).json({ created: false, msg: "School don't exist" });

      if (school.accepting_acounts < 1) return res.status(422).json({ created: false, msg: "School is not accepting new accounts" });
      const hasRequest = await _Request2.default.findOne({ where: { email: req.body.email } });
      if (hasRequest) return res.status(400).json({ craeted: false, msg: "Request already exist" });

      const userExist = await _User2.default.findOne({ where: { email: req.body.email } });
      if (userExist) return res.status(400).json({ created: false, msg: "User already exist" });
      req.body.school_id = school.id;
      req.body.status = "Pending";
      const request = await _Request2.default.create(req.body);
      if (!request) return res.status(500).json({ created: false, msg: "An error ocurred" });
      const token = await _jwtEmail2.default.create(request.id, request.email);
      const link = `${process.env.APP_URL}:${process.env.APP_PORT}/requests/confirm/${token}`;
      const button = `<a href='${link}' style="font-family: inherit;
      font-weight: 500;
      font-size: 17px;
      padding: 0.8em 1.5em 0.8em 1.2em;
      color: white;
     background: #185E2C;
      border: none;
      box-shadow: 0 0.7em 1.5em -0.5em #000;
      letter-spacing: 0.05em;
      border-radius: 20em; text-decoration: none;">Verificar email</a>`;
      const textEmail = `Saudações, ${req.body.name}. Estamos felizes por vocês aderirem à nossa plataforma. Por favor, clique nesse botão para verificarmos seu e-mail: <br><br><br><br> ${button}.<br><br><br><br> Caso o botão não funcione, clique nesse link: ${link}`;
      await _sendEmail2.default.call(void 0, request.email, "Validação de email", textEmail);
      return res.status(200).json({ created: true, msg: "Request sent successfully" });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async confirmEmail(req, res) {
    try {
      const dados = _jsonwebtoken2.default.verify(req.params.id, process.env.TOKEN_SECRET);
      const {
        id, email,
      } = dados;
      const request = await _Request2.default.findByPk(id);
      if (!request) return res.status(400).json("Request doesn't exist");
      await request.update({ verified: true });
      return res.status(200).json("Email verified");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }

  async acceptRequest(req, res) {
    try {
      const request = await _Request2.default.findOne({ where: { email: req.body.email } });
      if (!request) return res.status(400).json("Request doesn't exist");
      if (request.status !== 'Pending') return res.status(500).json("Internal server error");
      if (request.verified !== true) return res.status(422).json("The user have to confirm your email");
      req.status = "Allowed";
      if (req.user.Level < 3) return res.status(401).json("Unauthorized");
      const newUser = await _UserAccept2.default.create({
        nome: request.nome,
        sobrenome: request.sobrenome,
        email: request.email,
        password_hash: request.password_hash,
        school_id: request.school_id,
      });
      if (!newUser) return res.status(500).json("An error ocurred");
      await request.destroy();
      const school = await _School2.default.findByPk(newUser.school_id);
      if (!school) return res.status(422).json("School doesn't exist");
      const link = `${process.env.APP_URL}:${process.env.APP_PORT}/users/login/`;
      const button = `<a href='${link}' style="font-family: inherit;
      font-weight: 500;
      font-size: 17px;
      padding: 0.8em 1.5em 0.8em 1.2em;
      color: white;
     background: #185E2C;
      border: none;
      box-shadow: 0 0.7em 1.5em -0.5em #000;
      letter-spacing: 0.05em;
      border-radius: 20em; text-decoration: none;">Faça login aqui</a>`;
      const text = `Olá ${newUser.nome} seu pedido para fazer parte da instituição ${school.name} foi aceito com sucesso.  Faça login clicando aqui: <br> <br> ${button} `;
      await _sendEmail2.default.call(void 0, req.body.email, "Registro em nossa plataforma", text);
      return res.status(200).json("Created account");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }

  async rejectRequest(req, res) {
    try {
      const request = await _Request2.default.findOne({ where: { email: req.body.email } });
      if (!request) return res.status(400).json("Request doesn't exist");
      if (request.status !== 'Pending') return res.status(500).json("Internal server error");
      req.status = "Rejected";
      if (req.user.Level < 3) return res.status(401).json("Unauthorized");
      await request.destroy();
      const school = await _School2.default.findByPk(request.school_id);
      if (!school) return res.status(422).json("School doesn't exist");
      const text = `Olá, ${request.nome}. Seu pedido para fazer parte da instituição ${school.name} foi rejeitado.`;
      await _sendEmail2.default.call(void 0, req.body.email, "Adesão de conta", text);
      return res.status(200).json("Rejected request");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }
}

exports. default = new RequestsController();
