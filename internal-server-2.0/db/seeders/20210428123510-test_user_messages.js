const { getRandomRecord } = require('../../utils/getRandomRecordFromArray');

const messagesTexts = [
  'Some random test message text with small amount of text and ....',
  'Test message',
  '',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sintAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint',
];

const getMessagesFields = (n, users, candidates, tasks) => {
  const result = [];
  for (let i = 1; i <= n; i++) {
    const currentTask = tasks[n % tasks.length];
    const randomMessage = getRandomRecord(messagesTexts);
    const randomUser = getRandomRecord(users);
    const randomCandidate = getRandomRecord(candidates);
    result.push({
      id: i,
      message: randomMessage,
      author_id: randomUser.id,
      crm_tasks_id: currentTask.id,
      candidate_id: randomCandidate.id,
      files: ['file.txt', 'file2.txt'],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return result;
};

const getUserMessanges = (messages) => (
  messages.map((message, idx) => ({
    id: idx + 1,
    message_id: message.id,
    user_id: message.author_id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
);

module.exports = {
  up: async (queryInterface) => {
    const [crmTasks] = await queryInterface.sequelize.query('SELECT * FROM crm_tasks');
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');
    const [candidates] = await queryInterface.sequelize.query('SELECT * FROM candidates');
    const messagesFiedls = getMessagesFields(35, users, candidates, crmTasks);
    await queryInterface.bulkInsert('messages', messagesFiedls, {});

    const messagesUsersFiedls = getUserMessanges(messagesFiedls);
    await queryInterface.bulkInsert('messages_users', messagesUsersFiedls, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('messages_users', null, {});
    await queryInterface.bulkDelete('messages', null, {});
  },
};
