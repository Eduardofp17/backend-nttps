import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ errors: ['Faça login para continuar'] });

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const {
      id, email,
    } = dados;

    const user = await User.findOne({ where: { id, email } });
    if (!user) return res.status(401).json({ errors: ['Faça login novamente'] });

    if (user.level < 1) return res.status(401).json("Invalid permission");
    return next();
  } catch (e) { return res.status(401).json({ errors: ['Permissão inválida'] }); }
};
