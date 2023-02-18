"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Frequencia extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      sala: {
        type: _sequelize2.default.STRING,
      },
      qtdPresentes: {
        type: _sequelize2.default.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Envie algum valor",
          },
          max: {
            args: 50,
            msg: "A quantidade tem que ser menor ou igual a 50",
          },
        },
      },
      updated_by: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Login required",
          },
        },
      },
      Date: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        defaultValue: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      },
      Hour: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        defaultValue: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
  }
} exports.default = Frequencia;
