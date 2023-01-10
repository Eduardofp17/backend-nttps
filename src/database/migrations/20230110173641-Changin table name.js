/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameTable('frequencias_histories', 'FrequenciasHistoric');
  },

  async down() {},
};
