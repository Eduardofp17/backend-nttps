/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Schools', 'agree_with_terms_and_privacy_policy', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        isBoolean: true,
      },
    });
    await queryInterface.addColumn('Schools', 'is_public', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        isBoolean: true,
      },
    });
    await queryInterface.addColumn('Schools', 'school_modality', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: [1, 255],
      },
    });
    await queryInterface.addColumn('Schools', 'forms_of_education', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: [1, 255],
      },
    });
    await queryInterface.addColumn('Schools', 'cep', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: [9, 9],
      },
    });
    await queryInterface.addColumn('Schools', 'state', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: [1, 255],
      },
    });
    await queryInterface.addColumn('Schools', 'city', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: [1, 255],
      },
    });
    await queryInterface.addColumn('Schools', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: [1, 255],
      },
    });
    await queryInterface.addColumn('Schools', 'neighborhood', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: [1, 255],
      },
    });
  },

  async down() {

  },
};
