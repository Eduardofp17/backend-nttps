/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cardapios', 'school_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('frequencias_historics', 'school_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down() {
  },
};
