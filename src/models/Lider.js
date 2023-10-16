import Sequelize, { Model } from 'sequelize';

export default class Lider extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

    }, { sequelize, tableName: 'Lideres-de-salas' });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id' });
    this.belongsTo(models.Room, { foreignKey: 'room_id' }); // Assuming 'id' is the actual foreign key in the Room model
  }
}
