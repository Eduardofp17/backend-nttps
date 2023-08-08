import jwt from 'jsonwebtoken';
import User from "../models/User";
import Token from "../utils/jwtEmail";
import sendEmail from "../utils/sendEmail";
import SchoolModel from '../models/School';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        where: { school_id: req.user.School_id },
        attributes: ['id', 'nome', 'sobrenome', 'email', 'level', 'updated_at', 'created_at'],
        raw: true,
      });
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
      const user = await User.findByPk(req.userId);
      if (!user) return res.status(404).json({ errors: ['User not found'] });
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

  async updateRole(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        where: { school_id: req.user.School_id },
        attributes: ['id', 'nome', 'sobrenome', 'email', 'school_id', 'level', 'updated_at', 'created_at'],

      });
      if (!user) return res.status(404).json({ errors: ['User not found'] });

      if (user.school_id !== req.user.School_id) return res.status(401).json({ errors: ['You cannot update this user as it is not linked to your institution'] });
      const { level } = req.body;
      await user.update({ level });
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
      const user = await User.findOne({ where: { email: req.body.email } });
      let schoolUser;
      if (!user) schoolUser = await SchoolModel.findOne({ where: { email: req.body.email } });
      if (!user && !schoolUser) return res.status(422).json("User doesn't exist");
      let token;
      if (user) {
        token = await Token.create(user.id, user.email);
      }
      if (schoolUser) {
        token = await Token.create(schoolUser.id, schoolUser.email);
      }
      const link = `${process.env.FRONTEND_URL}/forgotpassword/redefine-password/:v1?${token}`;
      const button = `<a href='${link}' style="font-family: inherit;
      font-weight: 500;
      font-size: 17px;
      padding: 0.8em 1.5em 0.8em 1.2em;
      color: white;
     background: #185E2C;
      border: none;
      box-shadow: 0 0.7em 1.5em -0.5em #000;
      letter-spacing: 0.05em;
      border-radius: 20em; text-decoration: none;">Redefinir senha</a>`;
      const textEmail = `Clicando nesse botão você poderá redefinir sua senha: <br><br><br><br> ${button}.<br><br><br><br> Caso o botão não funcione, clique nesse link: ${link}`;
      if (user) {
        await sendEmail(user.email, "Redefinir senha", textEmail);
      }
      if (schoolUser) {
        await sendEmail(schoolUser.email, "Redefinir senha", textEmail);
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
      const dados = jwt.verify(req.params.id, process.env.TOKEN_SECRET);
      const {
        id, email,
      } = dados;
      const user = await User.findByPk(id);
      let schoolUser;
      if (!user) schoolUser = await SchoolModel.findByPk(id);
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

export default new UserController();
