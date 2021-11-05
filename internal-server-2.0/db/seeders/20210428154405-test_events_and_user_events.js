const { getRandomRecord } = require('../../utils/getRandomRecordFromArray');

const getEventsFields = (n) => {
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push({
      id: i,
      title: 'Test event title',
      dateFrom: new Date('01-04-2022'),
      dateTo: new Date('04-05-2022'),
      description: 'Test event desctiption',
      location: 'Africa',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return result;
};

const getMessagesUsersFiedls = (events, users) => (
  events.map((event, idx) => ({
    id: idx + 1,
    event_id: getRandomRecord(events).id,
    user_id: getRandomRecord(users).id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
);

module.exports = {
  up: async (queryInterface) => {
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');

    const eventsFiedls = getEventsFields(20);
    await queryInterface.bulkInsert('events', eventsFiedls, {});

    const messagesUsersFiedls = getMessagesUsersFiedls(eventsFiedls, users);
    await queryInterface.bulkInsert('user_events', messagesUsersFiedls, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_events', null, {});
    await queryInterface.bulkDelete('events', null, {});
  },
};
