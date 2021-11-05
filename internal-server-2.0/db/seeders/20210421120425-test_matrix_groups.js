module.exports = {
  up: async (queryInterface) => {
    const fields = [1, 2].map((groupId) => ({
      id: groupId,
      title: `Test matrix group title #${groupId}`,

      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('matrix_groups', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('matrix_groups', {
      title: {
        [Op.startsWith]: 'Test matrix group title',
      },
    }, {});
  },
};
