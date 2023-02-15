/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Schools', 'password_hash', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down() {
  },
};
