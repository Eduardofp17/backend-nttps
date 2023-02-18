"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);
var _code = require('../utils/code'); var _code2 = _interopRequireDefault(_code);
var _jwtEmail = require('../utils/jwtEmail'); var _jwtEmail2 = _interopRequireDefault(_jwtEmail);
var _sendEmail = require('../utils/sendEmail'); var _sendEmail2 = _interopRequireDefault(_sendEmail);
var _cnpj = require('../utils/cnpj'); var _cnpj2 = _interopRequireDefault(_cnpj);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Frequencia = require('../models/Frequencia'); var _Frequencia2 = _interopRequireDefault(_Frequencia);
var _Cardapios = require('../models/Cardapios'); var _Cardapios2 = _interopRequireDefault(_Cardapios);

class SchoolController {
  async index(req, res) {
    try {
      const schools = await _School2.default.findAll({
        attributes: ["id", "name", "email", "cnpj", "code", "accepting_acounts"],
        include: {
          model: _Cardapios2.default,
        },
      });

      return res.status(200).json(schools);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const school = await _School2.default.findByPk(req.user.School_id);
      await school.update(req.body);
      return res.status(200).json({
        updated: true,
        school: {
          id: school.id,
          name: school.name,
          cnpj: school.cnpj,
          code: school.code,
          accepting_acounts: school.accepting_acounts,
        },
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return 'Please fill in the fields';
      const schoolExist = await _School2.default.findOne({ where: { email: req.body.email } });
      if (schoolExist) return res.status(422).json({ created: false, msg: "School already exist" });
      req.body.code = _code2.default.call(void 0, );
      const isValid = await _cnpj2.default.consultCnpj(req.body.cnpj);
      if (!isValid) return res.status(400).json("Invalid cnpj");
      const school = await _School2.default.create(req.body);
      const token = await _jwtEmail2.default.create(school.id, school.email);
      const link = `${process.env.APP_URL}:${process.env.APP_PORT}/school/confirm/${token}`;
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
      const textEmail = `Olá, ${req.body.name}. Estamos felizes por vocês aderirem à nossa plataforma. Por favor, clique nesse botão para verificarmos seu email: <br><br><br><br> ${button}.<br><br><br><br> Caso o botão não funcione, clique nesse link: ${link}`;
      await _sendEmail2.default.call(void 0, school.email, "Validação de email", textEmail);
      return res.status(200).json({
        created: true,
        msg: "Account created successfully",
      });
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
      const school = await _School2.default.findByPk(id);
      if (!school) return res.status(400).json("School doesn't exist");
      await school.update({ verified: true });
      return res.status(200).json("Email verified");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }
}

exports. default = new SchoolController();
