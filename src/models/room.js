import Sequelize, { Model } from 'sequelize';

export default class Room extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      school_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, { sequelize, tableName: 'Rooms' });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
    this.hasMany(models.Students, { foreignKey: 'room_id', constraints: false });
    this.hasMany(models.Frequencia, { foreignKey: 'room_id', constraints: false });
  }
}
