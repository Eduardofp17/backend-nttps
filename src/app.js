require('dotenv').config();

import './database';
// Routes
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import homeRoutes from './routes/home';
import cardapioRoutes from './routes/cardapio';
import userRoutes from './routes/user';
import tokenRoutes from './routes/tokenRoutes';
import frequenciaRoutes from './routes/frequencia';
import schoolRoutes from './routes/school';
import requestsRoutes from './routes/request';
import emailRoutes from './routes/email';

const express = require('express');

const whitelist = ["http://localhost:5173", "https://nourishnet.net"];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/token/", tokenRoutes);
    this.app.use("/cardapio/", cardapioRoutes);
    this.app.use("/users/", userRoutes);
    this.app.use("/frequencia/", frequenciaRoutes);
    this.app.use("/school/", schoolRoutes);
    this.app.use("/requests/", requestsRoutes);
    this.app.use("/email/", emailRoutes);
    // Load test
    this.app.use("/loaderio-2ce44c64675215a24a8f093a9658d518/", (req, res) => {
      res.send("loaderio-2ce44c64675215a24a8f093a9658d518");
    });
  }
}

export default new App().app;
