"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Schools', 'accepting_acounts', {
      type: Sequelize.BOOLEAN,
    });

    
  },

  async down() {
  },
};
