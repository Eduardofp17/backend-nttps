import jwt from 'jsonwebtoken';

class TokenEmail {
  async create(id, email) {
    const token = jwt.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: 1200 },
    );

    return token;
  }
}

export default new TokenEmail();
