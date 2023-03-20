"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Cardapios extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      dayname: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        allowNull: true,
      },
      lunch: {
        type: _sequelize2.default.STRING,
        allowNull: true,
      },
      afternoonsnack: {
        type: _sequelize2.default.STRING,
        allowNull: true,
      },
      weeknumber: {
        type: _sequelize2.default.INTEGER,
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
        type: _sequelize2.default.INTEGER,
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
} exports.default = Cardapios;
