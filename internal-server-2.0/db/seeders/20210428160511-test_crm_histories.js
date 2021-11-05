const getHistoriesFields = (crmTasks) => {
  return crmTasks.map((task, idx) => ({
    id: idx + 1,
    event: 'Test CRM history event text',
    history_in_task: task.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

module.exports = {
  up: async (queryInterface) => {
    const [crm_tasks] = await queryInterface.sequelize.query('SELECT * FROM crm_tasks');

    const crmHistoriesFields = getHistoriesFields(crm_tasks);
    await queryInterface.bulkInsert('crm_histories', crmHistoriesFields, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('crm_histories', null, {});
  },
};
