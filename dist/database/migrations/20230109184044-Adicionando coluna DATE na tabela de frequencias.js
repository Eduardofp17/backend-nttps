"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('frequencia', 'Date', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down() {},
};
