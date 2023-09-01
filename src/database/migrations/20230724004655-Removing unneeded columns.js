/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('frequencias_historics', 'Hour');
    // await queryInterface.removeColumn('frequencias_historics', 'Date');
    // await queryInterface.removeColumn('frequencia', 'Hour');
    await queryInterface.removeColumn('frequencia', 'Date');
  },

  async down() {

  },
};
