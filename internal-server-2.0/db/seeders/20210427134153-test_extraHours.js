module.exports = {
  up: async (queryInterface) => {
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');
    const [user_projects] = await queryInterface.sequelize.query('SELECT * FROM user_projects');

    const extraHoursFields = [];
    let count = 0;
    users.forEach((user) => {
      const currentUserProjects = user_projects.filter((userProject) => (
        userProject.user_id === user.id));
      currentUserProjects.forEach((currentUserProject) => {
        const resObj = {
          date: new Date('2022-04-22'),
          description: 'Test extra hours description with a big amount of words',
          start: new Date('2022-04-22 9:30'),
          end: new Date('2022-04-22 16:30'),
          project_id: currentUserProject.project_id,
          user_id: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        extraHoursFields.push({
          id: ++count,
          ...resObj,
          isProcessed: true,
        });
        extraHoursFields.push({
          id: ++count,
          ...resObj,
          isProcessed: false,
        });
      });
    });
    await queryInterface.bulkInsert('extraHours', extraHoursFields, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('extraHours', null, {
      description: {
        [Op.startsWith]: 'Test extra hours description with a big amount of words',
      },
    });
  },
};
