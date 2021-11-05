const { getRandomRecord } = require('../../utils/getRandomRecordFromArray');

const plansTex = [
  'Small plan text',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
  '',
  'Test plan text for candidate plan',
];

const getPlansFields = (n) => {
  const plansFields = [];
  for (let i = 1; i <= n; i++) {
    plansFields.push({
      id: i,
      title: getRandomRecord(plansTex),
      description: getRandomRecord(plansTex),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return plansFields;
};

const getUserPlansFields = (plans, users) => {
  const plansFields = [];
  for (let i = 0; i < plans.length; i++) {
    const user = users[i % users.length];
    plansFields.push({
      id: i + 1,
      user_id: user.id,
      plan_id: plans[i].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return plansFields;
};

module.exports = {
  up: async (queryInterface) => {
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');

    const plansFields = getPlansFields(30);
    await queryInterface.bulkInsert('plans', plansFields, {});

    const userPlansFields = getUserPlansFields(plansFields, users);
    await queryInterface.bulkInsert('user_plans', userPlansFields, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_plans', null, {});
    await queryInterface.bulkDelete('plans', null, {});
  },
};
