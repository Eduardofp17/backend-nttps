/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('frequencia', 'room_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "This field must be integer.",
        },
      },
    });
  },

  async down() {
  },
};
