import jwt from 'jsonwebtoken';
import User from '../models/User';
import SchoolModel from '../models/School';

class TokenController {
  async create(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
    const user = await User.findOne({ where: { email } });
    let schoolUser;
    if (!user) schoolUser = await SchoolModel.findOne({ where: { email } });
    if (!user && !schoolUser) return res.status(401).json({ errors: ['Usuário não existe'] });
    if (schoolUser) {
      if (!await
      schoolUser.passwordValid(password)) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
    }
    if (user) {
      if (!await user.passwordValid(password)) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
    }

    const { id } = user || schoolUser;

    const token = jwt.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.send({ token });
  }
}

export default new TokenController();
