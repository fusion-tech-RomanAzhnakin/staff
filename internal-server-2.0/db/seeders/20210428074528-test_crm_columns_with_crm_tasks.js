const crmColumns = ['Получение информации', 'Интервью', 'Тестовое задание', 'Клиент решает', 'Приступили у работе', 'Ожидание'];

const crmTasks = [{
  description: '',
  comment: '',
  budget: '',
}, {
  description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti',
  comment: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui ',
  budget: '1 000 000 000 $',
}, {
  description: 'Test crm task description',
  comment: 'Test crm task comment',
  budget: '0 $',
}, {
  description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint',
  comment: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi',
  budget: '100 $',
}];

const getRandTechnologyArray = (technologies) => {
  const randomId = () => Math.floor(Math.random() * technologies.length);
  const randCount = () => Math.floor(Math.random() * (5 - 1) + 1);
  const result = [];

  for (let i = 0; i < randCount(); i++) {
    result.push(technologies[randomId()].title);
  }

  return result;
};

const getRejectParams = (isRejected, rejectReasons) => {
  let reject_reason_comment = null;
  let reject_reason_date = null;
  let reject_reason_id = null;

  if (isRejected) {
    const randReasonId = Math.floor(Math.random() * rejectReasons.length);

    reject_reason_comment = 'Test crm task reject reason comment';
    reject_reason_date = new Date();
    reject_reason_id = rejectReasons[randReasonId].id;
  }

  return {
    reject_reason_comment,
    reject_reason_date,
    reject_reason_id,
  };
};

const getCrmTasksFields = (crmColumnsFields, technologies, users, rejectReasons) => {
  const crmTasksFields = [];
  let count = 0;
  const dedicatedSeller = users.find((user) => user.role === 'sales').id;
  const usersIdArray = users.map((user) => user.id);
  const randomBoolean = () => Boolean(Math.round(Math.random()));

  crmColumnsFields.forEach((crmColumn) => {
    const columnsTasks = crmTasks.map((crmTask) => {
      const {
        reject_reason_comment,
        reject_reason_date,
        reject_reason_id,
      } = getRejectParams(randomBoolean(), rejectReasons);
      return {
        id: ++count,
        ...crmTask,
        subscription: usersIdArray,
        task_in_column: crmColumn.id,
        title: `Test crm task title #${count}`,

        lid_company: 'Test lid company',
        lid_contact_name: 'Yannik Heinze',
        lid_email: 'lidEmail@mail.com',
        lid_skype: 'lidSkype',
        lid_phone: '+49 999 9999999',
        lid_location: 'Gamburg',
        lid_time_zone: 2,
        job_link: 'Test crm task job link',
        additional_info_field: ['Test added info field'],
        additional_info_data: ['Test added info value'],
        proposal_link: 'https://www.upwork.com/jobs/~123123123123',
        project_folder_path: 'https://drive.google.com/drive/folders/123123_12312323',
        project_start_date: new Date('04-05-2022'),
        project_end_date: new Date('04-08-2022'),

        dedicated_seller: dedicatedSeller,
        technologies: getRandTechnologyArray(technologies),
        archive: randomBoolean(),
        contract: randomBoolean(),
        hot: randomBoolean(),
        invite: randomBoolean(),
        proposal: randomBoolean(),

        reject_reason_comment,
        reject_reason_date,
        reject_reason_id,

        event_datetime: new Date(),
        event_description: 'Test crm task event description',

        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    crmTasksFields.push(...columnsTasks);
  });
  return crmTasksFields;
};

module.exports = {
  up: async (queryInterface) => {
    const idChainArray = [];
    for (let i = 1; i < crmTasks.length * crmColumns.length; i++) {
      idChainArray.push(i);
    }
    const crmColumnsFields = crmColumns.map((columnName, idx) => ({
      id: idx + 1,
      title: columnName,
      idChain: idChainArray,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('crm_columns', crmColumnsFields, {});

    const [technologies] = await queryInterface.sequelize.query('SELECT * FROM technologies');
    const [rejectReasons] = await queryInterface.sequelize.query('SELECT * FROM crm_reject_reasons');
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');
    const crmTasksFields = getCrmTasksFields(crmColumnsFields, technologies, users, rejectReasons);
    await queryInterface.bulkInsert('crm_tasks', crmTasksFields, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('crm_columns', null, {});
    await queryInterface.bulkDelete('crm_tasks', null, {});
  },
};
