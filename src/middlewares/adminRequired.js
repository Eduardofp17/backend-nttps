import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async (req, res, next) => {
  try {
    if (req.user.Level < 3) return res.status(401).json("Invalid permission");
    return next();
  } catch (e) { return res.status(401).json({ errors: ['Permissão inválida'] }); }
};
