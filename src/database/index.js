import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Cardapio from "../models/Cardapios";
import User from "../models/User";
import Frequencia from "../models/Frequencia";
import FrequenciasHistoric from "../models/LastFrequency";

const models = [Cardapio, User, Frequencia, FrequenciasHistoric];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
