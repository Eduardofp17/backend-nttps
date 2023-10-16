import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import SchoolModel from '../models/School.js';
import Lider from '../models/Lider.js';
import Room from '../models/room.js';

class TokenController {
  async create(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
    const user = await User.findOne({ where: { email } });
    let schoolUser;
    if (!user) schoolUser = await SchoolModel.findOne({ where: { email } });
    if (!user && !schoolUser) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
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
    const result = {
      token,
      level: schoolUser ? 3 : user.level,
      school_id: schoolUser ? schoolUser.id : user.school_id,
    };
    if (user && user.level === 1) {
      const leader_infos = await Lider.findByPk(user.id);
      if (!leader_infos) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
      const room_infos = await Room.findByPk(leader_infos.room_id);
      if (!room_infos) return res.status(400).json({ errors: ['Email ou senha inválidos'] });
      result.room_id = room_infos.id;
      result.room_name = room_infos.name;
    }
    return res.send(result);
  }
}

export default new TokenController();
