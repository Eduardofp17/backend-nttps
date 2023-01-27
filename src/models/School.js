import Sequelize, { Model } from "sequelize";

export default class SchoolModel extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "You need to type the school name",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: {
          msg: "Email already exist",
        },
        validate: {
          notEmpty: {
            msg: "You need to type the email",
          },
          isEmail: {
            msg: "Type a valid email",
          },
        },
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: {
          msg: "Cnpj already exist",
        },
        validate: {
          notEmpty: {
            msg: "Enter a valid cnpj",
          },
        },
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ' ',
        unique: true,
        validate: {
          notEmpty: {
            msg: "Cannot be empty",
          },
        },
      },
    }, { sequelize, tableName: 'Schools' });
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'school_id' });
    this.hasMany(models.Frequencia, { foreignKey: 'school_id' });
  }
}
