import Sequelize, { Model } from 'sequelize';

export default class Frequencia extends Model {
  static init(sequelize) {
    super.init({
      updated_by: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Login required",
          },
        },
      },
      school_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The school_id is required",
          },
          isInt: {
            msg: "The school_id must be an integer value",
          },
        },
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The student_id is required",
          },
          isInt: {
            msg: "The student_id must be an integer value",
          },
        },
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The room_id is required",
          },
          isInt: {
            msg: "The room_id must be an integer value",
          },
        },
      },
      class_01: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      class_02: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      class_03: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      class_04: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      class_05: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      class_06: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      class_07: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      class_08: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      class_09: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    }, { sequelize, tableName: 'frequencia' });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
    this.belongsTo(models.Students, { foreignKey: 'student_id' });
    this.belongsTo(models.Room, { foreignKey: 'room_id' });
  }
}
