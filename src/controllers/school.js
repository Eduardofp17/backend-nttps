import jwt from 'jsonwebtoken';
import SchoolModel from "../models/School";
import codeGenerator from "../utils/code";
import Token from "../utils/jwtEmail";
import sendEmail from "../utils/sendEmail";
import CNPJ from '../utils/cnpj';

class SchoolController {
  async index(req, res) {
    try {
      const schools = await SchoolModel.findAll({
        attributes: ["id", "name", "email", "cnpj", "code", "accepting_acounts"],
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
        school,
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
      req.body.code = codeGenerator();
      const isValid = await CNPJ.consultCnpj(req.body.cnpj);
      if (!isValid) return res.status(400).json("Invalid cnpj");
      console.log(isValid);
      const school = await SchoolModel.create(req.body);
      const token = await Token.create(school.id, school.email);
      const link = `${process.env.APP_URL}:${process.env.APP_PORT}/school/confirm/${token}`;
      await sendEmail(school.email, "email Verification", link);
      return res.status(200).json({
        created: true,
        school,
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
      return res.status(200).json("Email verified");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }
}

export default new SchoolController();
