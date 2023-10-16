import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import SchoolModel from '../models/School.js';
import Lider from '../models/Lider.js';

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
    let schoolUser;
    if (!user) schoolUser = await SchoolModel.findOne({ where: { id, email } });
    if (!user && !schoolUser) return res.status(401).json({ errors: ['Faça login novamente'] });

    if (user) {
      req.user = {
        Id: user.id,
        Email: user.email,
        Nome: user.nome,
        Sobrenome: user.sobrenome,
        Level: user.level,
        School_id: user.school_id,
      };
    }
    if (schoolUser) {
      req.user = {
        Id: schoolUser.id,
        Email: schoolUser.email,
        Nome: schoolUser.name,
        Cnpj: schoolUser.cnpj,
        Level: 3,
        School_id: schoolUser.id,
      };
    }

    if (user && user.level === 1) {
      const { room_id } = await Lider.findByPk(user.id);
      req.user.room_id = room_id;
    }
    return next();
  } catch (e) { return res.status(401).json({ errors: ['Permissão inválida'] }); }
};
