import jwt from 'jsonwebtoken';
import RequestsModel from "../models/Request";
import SchoolModel from "../models/School";
import User from "../models/User";
import Token from "../utils/jwtEmail";
import sendEmail from "../utils/sendEmail";
import AcceptUser from '../models/UserAccept';
import NodeMailer from '../utils/nodemailer/pedido-aceito-nodemailer';

class RequestsController {
  async index(req, res) {
    try {
      const requests = await RequestsModel.findAll({ where: { school_id: req.user.School_id } }, { attributes: ['id'] });
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

      const school = await SchoolModel.findOne({ where: { code: req.body.code } });
      if (!school) return res.status(400).json({ created: false, msg: "School don't exist" });

      if (req.body.email === school.email) return res.status(400).json({ created: false, msg: "Invalid email or password" });
      if (school.accepting_accounts < 1) return res.status(422).json({ created: false, msg: "School is not accepting new accounts" });
      const hasRequest = await RequestsModel.findOne({ where: { email: req.body.email } });
      if (hasRequest) return res.status(400).json({ craeted: false, msg: "Request already exist" });

      const userExist = await User.findOne({ where: { email: req.body.email } });
      if (userExist) return res.status(400).json({ created: false, msg: "User already exist" });
      req.body.school_id = school.id;
      req.body.status = "Pending";
      const request = await RequestsModel.create(req.body);
      if (!request) return res.status(500).json({ created: false, msg: "An error ocurred" });
      const token = await Token.create(request.id, request.email);
      const link = `${process.env.FRONTEND_URL}/createaccount/confirmemail/:v1?${token}`;
      const data = {
        email: request.email,
        subject: 'validação de e-mail.',
        userName: `${request.nome} ${request.sobrenome}`,
        emailLink: link,
      };
      const url = 'https://backend.nourishnet.net/email/confirmar-email/';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      await fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          return response.json();
        });
      return res.status(200).json({ created: true, msg: "Request sent successfully" });
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
      const request = await RequestsModel.findByPk(id);
      if (!request) return res.status(400).json("Request doesn't exist");
      await request.update({ verified: true });
      return res.status(200).json("Email verified");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }

  async acceptRequest(req, res) {
    try {
      const request = await RequestsModel.findOne({ where: { email: req.body.email } });
      if (!request) return res.status(400).json("Request doesn't exist");
      if (request.status !== 'Pending') return res.status(500).json("Internal server error");
      if (request.verified !== true) return res.status(422).json("The user have to confirm your email");
      req.status = "Allowed";
      if (req.user.Level < 3) return res.status(401).json("Unauthorized");
      const newUser = await AcceptUser.create({
        nome: request.nome,
        sobrenome: request.sobrenome,
        email: request.email,
        password_hash: request.password_hash,
        school_id: request.school_id,
      });
      if (!newUser) return res.status(500).json("An error ocurred");
      await request.destroy();
      const school = await SchoolModel.findByPk(newUser.school_id);
      if (!school) return res.status(422).json("School doesn't exist");
      const data = {
        email: newUser.email,
        subject: 'Registro na plataforma Nourishnet',
        userName: `${newUser.nome} ${newUser.sobrenome}`,
        userInstituicao: school.name,
      };
      const url = 'https://backend.nourishnet.net/email/pedido-aceito/';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      await fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          return response.json();
        });
      return res.status(200).json("Created account");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }

  async rejectRequest(req, res) {
    try {
      const request = await RequestsModel.findOne({ where: { email: req.body.email } });
      if (!request) return res.status(400).json("Request doesn't exist");
      if (request.status !== 'Pending') return res.status(500).json("Internal server error");
      req.status = "Rejected";
      if (req.user.Level < 3) return res.status(401).json("Unauthorized");
      await request.destroy();
      const school = await SchoolModel.findByPk(request.school_id);
      if (!school) return res.status(422).json("School doesn't exist");
      const data = {
        email: request.email,
        subject: 'Registro na plataforma Nourishnet',
        userName: `${request.nome} ${request.sobrenome}`,
        userInstituicao: school.name,
      };
      const url = 'https://backend.nourishnet.net/email/pedido-negado/';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      await fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          return response.json();
        });
      return res.status(200).json("Rejected request");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }
}

export default new RequestsController();
