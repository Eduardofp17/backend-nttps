import dotenv from 'dotenv';

dotenv.config();

import './database/index.js';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import path, { dirname } from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
// Routes
import homeRoutes from './routes/home.js';
import cardapioRoutes from './routes/cardapio.js';
import userRoutes from './routes/user.js';
import tokenRoutes from './routes/tokenRoutes.js';
import frequenciaRoutes from './routes/frequencia.js';
import schoolRoutes from './routes/school.js';
import requestsRoutes from './routes/request.js';
import emailRoutes from './routes/email.js';
import roomRoutes from './routes/room.js';
import studentRoutes from './routes/students.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

import { swaggerJson as swaggerDocs } from './swagger.js';

const whitelist = ["http://localhost:5173", "https://nourishnet.net", "http://localhost:3090", "https://backend.nourishnet.net"];

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
    this.app.use('/static', express.static(path.join(__dirname, 'public')));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.set('view engine', 'ejs');
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
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    this.app.use("/room/", roomRoutes);
    this.app.use("/student/", studentRoutes);
  }
}

export default new App().app;
