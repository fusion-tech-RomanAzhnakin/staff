module.exports = {
  up: async (queryInterface) => {
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');

    const errorsFields = users.map((user, idx) => ({
      id: idx + 1,
      filename: user.avatar,
      error: 'Test user error description text',
      routeName: 'Test user error route name',
      user: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('errors', errorsFields, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('errors', null, {
      error: {
        [Op.startsWith]: 'Test user error description text',
      },
    });
  },
};
