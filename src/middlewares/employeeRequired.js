import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  try {
    if (req.user.Level < 2) return res.status(401).json("Invalid permission");
    return next();
  } catch (e) { return res.status(401).json({ errors: ['Permissão inválida'] }); }
};
