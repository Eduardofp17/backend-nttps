/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Schools', 'accepting_acounts', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down() {
  },
};
