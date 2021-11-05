const { getRandomRecord } = require('../../utils/getRandomRecordFromArray');

const candidatesColumns = ['Ожидают Подтверждения', 'Интервью', 'Отправлено тестовое', 'Обработка', 'Оффер'];

const englishLevels = ['beginner', 'elementary', 'intermediate', 'upperIntermediate', 'advanced', 'proficiency'];

const getCandidateObj = (columnId, hrId) => {
  return {
    firstName: 'Firstname',
    lastName: 'Lastname',
    social: ['https://vk.com', 'https://ok.ru/'],
    job_experience: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    repo: ['https://github.com', 'https://gitlab.com'],
    english_level: getRandomRecord(englishLevels),
    additional_info: 'Some additional info text a big amount of words',
    army: Boolean(Math.round(Math.random())),
    studying: Boolean(Math.round(Math.random())),
    hr_id: hrId,
    column_id: columnId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const getCandidates = (n, columns, hrUser) => {
  const candidatesFields = [];
  for (let i = 1; i <= n; i++) {
    const currentColumn = columns[i % columns.length];
    candidatesFields.push({
      id: i,
      ...getCandidateObj(currentColumn.id, hrUser.id),
    });
  }
  return candidatesFields;
};

module.exports = {
  up: async (queryInterface) => {
    const candidatesColumnsFiedls = candidatesColumns.map((columnTitle, idx) => ({
      id: idx + 1,
      title: columnTitle,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('candidate_columns', candidatesColumnsFiedls, {});

    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');
    const hrUser = users.find((user) => user.role === 'hr');
    const candidatesFiedls = getCandidates(20, candidatesColumnsFiedls, hrUser);
    await queryInterface.bulkInsert('candidates', candidatesFiedls, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('candidates', null, {});
    await queryInterface.bulkDelete('candidate_columns', null, {});
  },
};
