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
      school_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: ' ',
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
  }
}
