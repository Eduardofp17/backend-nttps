import RequestsModel from "../models/Request";
import SchoolModel from "../models/School";
import User from "../models/User";

class RequestsController {
  async index(req, res) {
    try {
      const requests = await RequestsModel.findAll({ where: { school_id: req.user.School_id } });
      return res.status(200).json(requests);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    try {
      if (!req.body.code) return res.status(400).json("Please fill the field with an code");
      const school = await SchoolModel.findOne({ where: { code: req.body.code } });
      if (!school) return res.status(400).json("School don't exist");
      const hasRequest = await RequestsModel.findOne({ where: { email: req.body.email } });
      if (hasRequest) return res.status(400).json("Request already exist");

      console.log(req.body.email);
      const userExist = await User.findOne({ where: { email: req.body.email } });
      if (userExist) return res.status(400).json("User already exist");
      req.body.school_id = school.id;
      req.body.status = "Pending";
      const request = await RequestsModel.create(req.body);

      return res.status(200).json("Request sent successfully");
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new RequestsController();
