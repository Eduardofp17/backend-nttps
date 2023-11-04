/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Requests', 'agree_with_terms_and_privacy_policy', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        isBoolean: true,
      },
    });
    await queryInterface.addColumn('Requests', 'is_male', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        isBoolean: true,
      },
    });
    await queryInterface.addColumn('Requests', 'birthday', {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    });
    await queryInterface.addColumn('users', 'agree_with_terms_and_privacy_policy', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        isBoolean: true,
      },
    });
    await queryInterface.addColumn('users', 'is_male', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        isBoolean: true,
      },
    });
    await queryInterface.addColumn('users', 'birthday', {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
  },
};
