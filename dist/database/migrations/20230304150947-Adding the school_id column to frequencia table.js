"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('frequencia', 'qtdPresentes', 'qtd_presentes');
  },

  async down() {

  },
};
