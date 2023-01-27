import SchoolModel from "../models/School";
import codeGenerator from "../utils/code";

class SchoolController {
  async index(req, res) {
    try {
      const schools = await SchoolModel.findAll({
        attributes: ["id", "name", "email", "cnpj", "code"],
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
      const school = await SchoolModel.create(req.body);

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
}

export default new SchoolController();
