import Sequelize from "sequelize";
import databaseConfig from "../config/database.js";
import Cardapio from "../models/Cardapios.js";
import User from "../models/User.js";
import Frequencia from "../models/Frequencia.js";
import FrequenciasHistoric from "../models/LastFrequency.js";
import School from "../models/School.js";
import Request from '../models/Request.js';
import AcceptModel from '../models/UserAccept.js';
import Students from "../models/student.js";
import Room from "../models/room.js";
import Lider from "../models/Lider.js";

const models = [Cardapio, User, Frequencia, FrequenciasHistoric, School,
  Request, AcceptModel, Room, Students, Lider];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
