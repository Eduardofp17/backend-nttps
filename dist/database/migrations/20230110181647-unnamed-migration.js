"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('frequencias_historics', 'updated_by', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down() {},
};
