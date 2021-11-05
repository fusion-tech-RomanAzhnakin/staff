const getSubscriptionsFields = (candidates, users) => {
  const userSubscriptions = [];
  const subscriptionNotifications = [];
  let count = 0;
  users.forEach((user) => {
    candidates.forEach((candidate) => {
      ++count;
      userSubscriptions.push({
        id: count,
        candidate_id: candidate.id,
        user_id: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      subscriptionNotifications.push({
        id: count,
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: user.id,
      });
    });
  });
  return {
    userSubscriptions,
    subscriptionNotifications,
  };
};

module.exports = {
  up: async (queryInterface) => {
    const [candidates] = await queryInterface.sequelize.query('SELECT * FROM candidates');
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');

    const {
      userSubscriptions,
      subscriptionNotifications,
    } = getSubscriptionsFields(candidates, users);
    await queryInterface.bulkInsert('user_subscriptions', userSubscriptions, {});
    await queryInterface.bulkInsert('subscription_notifications', subscriptionNotifications, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('subscription_notifications', null, {});
    await queryInterface.bulkDelete('user_subscriptions', null, {});
  },
};
