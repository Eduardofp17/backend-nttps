/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('frequencia', 'Hour', {
      type: Sequelize.STRING,
    });
  },

  async down() {

  },
};
