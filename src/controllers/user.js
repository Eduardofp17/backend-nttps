import jwt from 'jsonwebtoken';
import User from "../models/User";
import Token from "../utils/jwtEmail";
import sendEmail from "../utils/sendEmail";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'sobrenome', 'email', 'level'] });
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
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) return res.status(422).json("User doesn't exist");
      const token = await Token.create(user.id, user.email);
      const link = `${process.env.APP_URL}:${process.env.APP_PORT}/users/redefine/${token}`;
      await sendEmail(user.email, "Enviamos um email para você, clicando no link você poderá redefinir sua senha", link);
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
      if (!user) return res.status(400).json("User doesn't exist");
      if (!req.body.password) return res.status(400).json("Please type the new password");
      await user.update({ password: req.body.password });
      return res.status(200).json("Password redefined");
    } catch (e) {
      return res.status(500).json("Internal server error");
    }
  }
}

export default new UserController();
