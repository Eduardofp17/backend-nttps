"use strict";Object.defineProperty(exports, "__esModule", {value: true});const jwt = require('jsonwebtoken');

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

exports. default = new TokenEmail();
