const skillLeves = ['junior', 'middle', 'senior'];

module.exports = {
  up: async (queryInterface) => {
    const fields = skillLeves.map((skillLevel, idx) => ({
      id: idx + 1,
      title: `Test matrix skill with ${skillLevel} level title`,
      description: `Test matrix skill with ${skillLevel} and description with a big amount of text`,

      section_id: 1,
      level: skillLevel,

      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('matrix_skills', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('matrix_skills', {
      title: {
        [Op.startsWith]: 'Test matrix skill with',
      },
    }, {});
  },
};
