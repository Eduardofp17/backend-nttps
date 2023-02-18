"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class RequestsModel extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 33],
            msg: "Seu nome deve ter entre 3 e 33 caracteres",
          },
        },
      },
      sobrenome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: "Seu sobrenome deve ter entre 3 e 100 caracteres",
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
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
      school_id: {
        type: _sequelize2.default.INTEGER,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "A user must be associated with a school",
          },
        },
      },
      status: {
        type: _sequelize2.default.INTEGER,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "Internal error. Plese send the status",
          },
        },
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
            msg: "Sua senha pode conter de 6 à 26 caracteres",
          },
        },
      },
      verified: {
        type: _sequelize2.default.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
    }, { sequelize, tableName: 'Requests' });
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
    this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
  }
} exports.default = RequestsModel;
