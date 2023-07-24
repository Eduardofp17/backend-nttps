import Sequelize, { Model } from 'sequelize';

export default class Frequencia extends Model {
  static init(sequelize) {
    super.init({
      sala: {
        type: Sequelize.STRING,
      },
      qtd_presentes: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Login required",
          },
        },
      },
    }, { sequelize, tableName: 'frequencia' });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
  }
}
