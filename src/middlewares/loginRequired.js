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

    req.user = {
      Id: user.id,
      Email: user.email,
      Nome: user.nome,
      Sobrenome: user.sobrenome,
      Level: user.level,
      School_id: user.school_id,
    };
    return next();
  } catch (e) { console.log(e); return res.status(401).json({ errors: ['Permissão inválida'] }); }
};
