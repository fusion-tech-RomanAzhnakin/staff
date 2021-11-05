const technologies = [{
  title: 'React',
  group_id: 1,
}, {
  title: 'MongoDB',
  group_id: 2,
}, {
  title: 'PostgreSQL',
  group_id: 2,
}, {
  title: 'NodeJS',
  group_id: 2,
}, {
  title: 'GraphQL',
  group_id: 2,
}, {
  title: 'Apollo Client',
  group_id: 2,
}, {
  title: 'AWS',
  group_id: 3,
}, {
  title: 'Sequelize',
  group_id: 2,
}, {
  title: 'Mongoose',
  group_id: 2,
}, {
  title: 'React Native',
  group_id: 4,
}, {
  title: 'Expo',
  group_id: 4,
}, {
  title: 'Express',
  group_id: 2,
}];

const techGroups = ['Frontend', 'Backend', 'DevOps', 'Mobile'];

module.exports = {
  up: async (queryInterface) => {
    const techGroupsFields = techGroups.map((techGroupTitle, idx) => ({
      id: idx + 1,
      title: techGroupTitle,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('techGroups', techGroupsFields, {});

    const technologiesFields = technologies.map((technology, idx) => ({
      id: idx + 1,
      title: technology.title,
      group_id: technology.group_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('technologies', technologiesFields, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('techGroups', null, {});
    await queryInterface.bulkDelete('technologies', null, {});
  },
};
