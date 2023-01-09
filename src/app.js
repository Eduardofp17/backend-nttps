require('dotenv').config();

import './database';
// Routes
import homeRoutes from './routes/home';
import cardapioRoutes from './routes/cardapio';
import userRoutes from './routes/user';
import tokenRoutes from './routes/tokenRoutes';
import frequenciaRoutes from './routes/frequencia';

const express = require('express');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/token/", tokenRoutes);
    this.app.use("/cardapio/", cardapioRoutes);
    this.app.use("/users/", userRoutes);
    this.app.use("/frequencia/", frequenciaRoutes);
  }
}

export default new App().app;
