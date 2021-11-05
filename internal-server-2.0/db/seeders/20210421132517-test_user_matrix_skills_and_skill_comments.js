const { getRandomRecord } = require('../../utils/getRandomRecordFromArray');

const userMatrixSkillKnowledgeLevelEnum = ['low', 'high'];

module.exports = {
  up: async (queryInterface) => {
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');
    const [matrixSkills] = await queryInterface.sequelize.query('SELECT * FROM matrix_skills');

    const randomKNid = () => Math.floor(Math.random() * (userMatrixSkillKnowledgeLevelEnum.length));
    const userMatrixSkillsFields = users.map((user, idx) => ({
      id: idx + 1,
      user_id: user.id,
      comment: 'Test user matrix skills comment',
      learn_sources: 'Test user matrix skill learn sourses',
      knowledge_level: userMatrixSkillKnowledgeLevelEnum[randomKNid()],
      matrix_skill_id: getRandomRecord(matrixSkills).id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('user_matrix_skills', userMatrixSkillsFields, {});

    const matrixSkillCommentsFields = matrixSkills.map((matrixSkill, idx) => ({
      id: idx + 1,
      user_matrix_skill_id: idx + 1,
      created_by: getRandomRecord(users).id,
      text: `Test matrix skill comment for ${matrixSkill.level} skill level with a big amount of words`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('matrix_skill_comments', matrixSkillCommentsFields, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('user_matrix_skills', {
      comment: {
        [Op.startsWith]: 'Test user matrix skills comment',
      },
    }, {});

    await queryInterface.bulkDelete('matrix_skill_comments', {
      text: {
        [Op.startsWith]: 'Test matrix skill comment for',
      },
    }, {});
  },
};
