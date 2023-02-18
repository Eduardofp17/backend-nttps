"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Schools', 'verified', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
    await queryInterface.addColumn('Requests', 'verified', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  },

  async down() {

  },
};
