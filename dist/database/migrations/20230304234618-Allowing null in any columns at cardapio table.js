"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('cardapios', 'breakfast', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('cardapios', 'lunch', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('cardapios', 'afternoonsnack', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down() {

  },
};
