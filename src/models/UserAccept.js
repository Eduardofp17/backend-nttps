import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 33],
            msg: "Seu nome deve ter entre 3 e 33 caracteres",
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: "Seu sobrenome deve ter entre 3 e 100 caracteres",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: "Você deve mandar um email válido",
          },
        },
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      school_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "A user must be associated with a school",
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, { sequelize, tableName: 'users' });
    return this;
  }

  passwordValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
  }
}
