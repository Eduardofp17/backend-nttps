import jwt from 'jsonwebtoken';
import SchoolModel from "../models/School";
import codeGenerator from "../utils/code";
import Token from "../utils/jwtEmail";
import sendEmail from "../utils/sendEmail";
import CNPJ from '../utils/cnpj';
import User from '../models/User';
import Frequencia from '../models/Frequencia';
import Cardapios from '../models/Cardapios';

class SchoolController {
  async index(req, res) {
    try {
      const schools = await SchoolModel.findAll({
        attributes: ["id", "name", "email", "cnpj", "code", "accepting_accounts"],
        include: {
          model: Cardapios,
        },
      });

      return res.status(200).json(schools);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const school = await SchoolModel.findByPk(req.user.School_id);
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
      const schoolExist = await SchoolModel.findOne({ where: { email: req.body.email } });
      if (schoolExist) return res.status(422).json({ created: false, msg: "School already exist" });
      req.body.code = codeGenerator();
      const isValid = await CNPJ.consultCnpj(req.body.cnpj);
      if (!isValid) return res.status(400).json({ created: false, msg: "Invalid Cnpj" });
      const school = await SchoolModel.create(req.body);
      const token = await Token.create(school.id, school.email);
      const link = `${process.env.FRONTEND_URL}/createaccount/confirmemail-school/:v1?${token}`;
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
      await sendEmail(school.email, "Validação de email", textEmail);
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
      const dados = jwt.verify(req.params.id, process.env.TOKEN_SECRET);
      const {
        id, email,
      } = dados;
      const school = await SchoolModel.findByPk(id);
      if (!school) return res.status(400).json("School doesn't exist");
      await school.update({ verified: true });
      console.log('Verifiquei');
      return res.status(200).json("Email verified");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }
}

export default new SchoolController();
