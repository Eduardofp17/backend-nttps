/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Lideres-de-salas', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Lideres-de-salas', 'updatedAt', 'updated_at');
  },

  async down() {

  },
};
