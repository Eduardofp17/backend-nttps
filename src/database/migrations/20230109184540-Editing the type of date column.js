/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('frequencia', 'Date', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down() {},
};
