/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('frequencia', 'qtd_presentes', {
      type: Sequelize.INTEGER,
    });
  },

  async down() {

  },
};
