"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class SchoolModel extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "You need to type the school name",
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        allowNull: false,
        defaultValue: ' ',
        unique: true,
        validate: {
          notEmpty: {
            msg: "Cannot be empty",
          },
        },
      },
      accepting_acounts: {
        type: _sequelize2.default.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      verified: {
        type: _sequelize2.default.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
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
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });
    return this;
  }

  passwordValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'school_id' });
    this.hasMany(models.Frequencia, { foreignKey: 'school_id' });
    this.hasMany(models.Cardapios, { foreignKey: 'school_id' });
    this.hasMany(models.RequestsModel, { foreignKey: 'school_id' });
  }
} exports.default = SchoolModel;
