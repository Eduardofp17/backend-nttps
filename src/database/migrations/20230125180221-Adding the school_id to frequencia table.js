/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('frequencia', 'school_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down() {

  },
};
