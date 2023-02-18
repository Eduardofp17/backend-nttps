"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Schools', 'code', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down() {

  },
};
