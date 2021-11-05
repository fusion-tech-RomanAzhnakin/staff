const { getRandomRecord } = require('../../utils/getRandomRecordFromArray');

const getCandidatesTechnologiesFields = (n, technologies, candidates) => {
  const candidatesTechnologiesFields = [];
  for (let i = 1; i <= n; i++) {
    candidatesTechnologiesFields.push({
      id: i,
      technology_id: getRandomRecord(technologies).id,
      candidate_id: getRandomRecord(candidates).id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return candidatesTechnologiesFields;
};

module.exports = {
  up: async (queryInterface) => {
    const [technologies] = await queryInterface.sequelize.query('SELECT * FROM technologies');
    const [candidates] = await queryInterface.sequelize.query('SELECT * FROM candidates');

    const candidatesTechnologies = getCandidatesTechnologiesFields(15, technologies, candidates);
    await queryInterface.bulkInsert('candidate_technologies', candidatesTechnologies, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('candidate_technologies', null, {});
  },
};
