"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lastFrequency', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sala: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      breakfast: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lunch: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      afternoonsnack: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('lastFrequency');
  },
};
