"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class FrequenciasHistoric extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      sala: {
        type: _sequelize2.default.STRING,
      },
      breakfast: {
        type: _sequelize2.default.INTEGER,
      },
      lunch: {
        type: _sequelize2.default.INTEGER,
      },
      afternoonsnack: {
        type: _sequelize2.default.INTEGER,
      },
      updated_by: {
        type: _sequelize2.default.STRING,
      },
      Date: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      Hour: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      school_id: {
        type: _sequelize2.default.INTEGER,
        allowNull: false,
        defaultValue: ' ',
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
  }
} exports.default = FrequenciasHistoric;
