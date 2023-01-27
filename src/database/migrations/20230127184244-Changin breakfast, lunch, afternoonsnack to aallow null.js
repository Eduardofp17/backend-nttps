/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('cardapios', 'Breakfast', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('cardapios', 'Lunch', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('cardapios', 'AfternoonSnack', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down() {

  },
};
