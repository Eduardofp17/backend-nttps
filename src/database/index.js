import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Cardapio from "../models/Cardapios";
import User from "../models/User";
import Frequencia from "../models/Frequencia";
import FrequenciasHistoric from "../models/LastFrequency";
import School from "../models/School";
import Request from '../models/Request';
import AcceptModel from '../models/UserAccept';

const models = [Cardapio, User, Frequencia, FrequenciasHistoric, School, Request, AcceptModel];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
