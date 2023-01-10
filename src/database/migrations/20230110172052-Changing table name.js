/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameTable('lastFrequency', 'frequencias_history');
  },

  async down() {},
};
