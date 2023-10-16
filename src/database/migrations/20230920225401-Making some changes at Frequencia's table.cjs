/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('frequencia', 'sala', 'name');
    await queryInterface.removeColumn('frequencia', 'qtd_presentes');
    await queryInterface.addColumn('frequencia', 'student_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "This field must be integer.",
        },
      },
    });
    const addFrequenciaColumn = async (i) => {
      await queryInterface.addColumn(`frequencia`, `class_0${i}`, {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        validate: {
          isBoolean: {
            msg: "The value must be a boolean value (true or false).",
          },
        },
      });
    };

    for (let i = 1; i <= 9; i++) {
      addFrequenciaColumn(i);
    }
  },
};
