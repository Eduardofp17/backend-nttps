import Sequelize, { Model } from 'sequelize';

export default class FrequenciasHistoric extends Model {
  static init(sequelize) {
    super.init({
      sala: {
        type: Sequelize.STRING,
      },
      breakfast: {
        type: Sequelize.INTEGER,
      },
      lunch: {
        type: Sequelize.INTEGER,
      },
      afternoonsnack: {
        type: Sequelize.INTEGER,
      },
      updated_by: {
        type: Sequelize.STRING,
      },
      Date: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      Hour: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, { sequelize });
    return this;
  }
}
