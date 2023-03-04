import Sequelize, { Model } from 'sequelize';

export default class Cardapios extends Model {
  static init(sequelize) {
    super.init({
      dayname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ' ',
        validate: {
          len: {
            args: [5, 20],
            msg: "The name of the day must be between 5 and 20 characters long",
          },
        },
      },
      breakfast: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lunch: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      afternoonsnack: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      weeknumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: ' ',
        validate: {
          max: {
            args: 2,
            msg: "The weeknumber can be only 0 or 1",
          },
        },
      },
      school_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: ' ',
        validate: {
          notEmpty: {
            msg: "A cardapio must be associated with a school",
          },
        },
      },
    }, { sequelize, tableName: 'cardapios' });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
  }
}
