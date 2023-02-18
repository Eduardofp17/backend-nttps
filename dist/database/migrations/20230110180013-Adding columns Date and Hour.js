"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('frequencias_historics', 'Hour', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('frequencias_historics', 'Date', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down() {},
};
