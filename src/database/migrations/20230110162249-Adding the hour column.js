/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('frequencia', 'Hour', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down() {},
};
