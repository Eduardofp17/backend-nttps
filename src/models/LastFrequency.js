import Sequelize, { Model } from 'sequelize';

export default class LastFrequency extends Model {
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
      afternonsnack: {
        type: Sequelize.INTEGER,
      },
    }, { sequelize });
    return this;
  }
}
