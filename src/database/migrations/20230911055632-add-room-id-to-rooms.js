/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Rooms', 'room_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Adjust allowNull as needed
      references: {
        model: 'Rooms', // Reference the same table
        key: 'id', // Reference the primary key of the table
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Rooms', 'room_id');
  },
};
