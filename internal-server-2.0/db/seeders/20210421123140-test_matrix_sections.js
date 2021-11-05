module.exports = {
  up: async (queryInterface) => {
    const [matrix_groups] = await queryInterface.sequelize.query('SELECT * FROM matrix_groups');

    const fields = matrix_groups.map((matrix_group) => ({
      id: matrix_group.id,
      title: `Test matrix section title #${matrix_group.id}`,
      group_id: 1,

      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('matrix_sections', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('matrix_sections', {
      title: {
        [Op.startsWith]: 'Test matrix section title',
      },
    }, {});
  },
};
