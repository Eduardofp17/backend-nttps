import User from "../models/User";

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

  async create(req, res) {
    try {
      const newUser = await User.create(req.body);

      const {
        id, nome, sobrenome, email, level,
      } = newUser;

      return res.json({
        id, nome, sobrenome, email, level,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

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
}

export default new UserController();
