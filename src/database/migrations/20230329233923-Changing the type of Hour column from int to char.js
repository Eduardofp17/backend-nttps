/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('frequencias_historics', 'Hour', {
      type: Sequelize.STRING,
    });
  },

  async down() {

  },
};
