import Sequelize, { Model } from "sequelize";
import bcryptjs from 'bcryptjs';

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
      accepting_accounts: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 26],
            msg: "Sua senha deve conter de 6 à 26 caracteres",
          },
        },
      },
    }, { sequelize, tableName: 'Schools' });
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  passwordValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'school_id' });
    this.hasMany(models.Frequencia, { foreignKey: 'school_id' });
    this.hasMany(models.Cardapios, { foreignKey: 'school_id' });
    this.hasMany(models.RequestsModel, { foreignKey: 'school_id' });
  }
}
