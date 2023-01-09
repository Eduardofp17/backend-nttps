/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cardapios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      dayname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      breakfast: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lunch: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      afternoonsnack: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weeknumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cardapios');
  },
};
