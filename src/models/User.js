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
            msg: "Sua senha pode conter de 6 à 26 caracteres",
          },
        },
      },
    }, { sequelize });
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
}
