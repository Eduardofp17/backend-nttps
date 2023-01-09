import Sequelize, { Model } from 'sequelize';

export default class Cardapios extends Model {
  static init(sequelize) {
    super.init({
      dayname: Sequelize.STRING,
      breakfast: Sequelize.STRING,
      lunch: Sequelize.STRING,
      afternoonsnack: Sequelize.STRING,
      weeknumber: Sequelize.INTEGER,
    }, { sequelize });
    return this;
  }
}
