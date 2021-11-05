const { getRandomRecord } = require('../../utils/getRandomRecordFromArray');

const plansTex = [
  'Small task job text',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
  '',
  'Test task job text for candidate',
];

const getTaskJobsFields = (n) => {
  const taskJobs = [];
  for (let i = 1; i <= n; i++) {
    taskJobs.push({
      id: i,
      title: getRandomRecord(plansTex),
      description: getRandomRecord(plansTex),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return taskJobs;
};

const getPlanTaskJobsFields = (taskJobs, plans) => {
  const plansFields = [];
  for (let i = 0; i < taskJobs.length; i++) {
    const plan = plans[i % plans.length];
    plansFields.push({
      id: i + 1,
      plan_id: plan.id,
      taskJob_id: taskJobs[i].id,
      status: Boolean(Math.round(Math.random())),
      startTask: new Date('01-01-2021'),
      finishTask: new Date('04-05-2022'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return plansFields;
};

module.exports = {
  up: async (queryInterface) => {
    const [plans] = await queryInterface.sequelize.query('SELECT * FROM plans');

    const taskJobsFields = getTaskJobsFields(30);
    await queryInterface.bulkInsert('taskJobs', taskJobsFields, {});

    const planTaskJobsFields = getPlanTaskJobsFields(taskJobsFields, plans);
    await queryInterface.bulkInsert('plan_taskJobs', planTaskJobsFields, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('plan_taskJobs', null, {});
    await queryInterface.bulkDelete('taskJobs', null, {});
  },
};
