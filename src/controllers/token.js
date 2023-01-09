import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async create(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.status(401).json({ errors: ['Email ou senha inválido'] });
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ errors: ['Usuário não existe'] });

    if (!await user.passwordValid(password)) return res.status(401).json({ errors: ['Email ou senha inválido'] });
    const { id } = user;

    const token = jwt.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.send({ token });
  }
}

export default new TokenController();
