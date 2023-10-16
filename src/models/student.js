import Sequelize, { Model } from 'sequelize';

export default class Students extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'name is required',
          },
          isString(value) {
            if (typeof value !== 'string') {
              throw new Error('name must be a string');
            }
          },
          len: {
            args: [3, 60],
            msg: "Name must be between 3 and 60 characters long",
          },
        },
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'room_id is required',
          },
          isInt: {
            msg: 'room_id must be an integer',
          },
        },
      },

    }, { sequelize, tableName: 'Students' });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Room, { foreignKey: 'room_id' });
  }
}
