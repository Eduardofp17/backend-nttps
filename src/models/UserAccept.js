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
            msg: "Your name must be between 3 and 33 characters",
          },
          notEmpty: {
            msg: "Please fill in the name field",
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: "Your last name must be between 3 and 100 characters",
          },
          notEmpty: {
            msg: "Please fill in the last name field",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'This email is already in use',
        },
        validate: {
          isEmail: {
            msg: "Please enter a valid email",
          },
          notEmpty: {
            msg: "Please fill in the email field",
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
        validate: {
          notEmpty: {
            msg: "A user must be associated with a school",
          },
        },
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter your birthday",
          },
        },
      },
      agree_with_terms_and_privacy_policy: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "You must agree to the terms and privacy policy",
          },
        },
      },
      is_male: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please select the gender",
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
