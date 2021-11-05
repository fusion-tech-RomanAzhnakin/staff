const statusFields = ['wait', 'completed', 'denied', 'inProgress', 'accept'];

const typeFields = [{
  type: 'technical',
}, {
  type: 'vacation',
}, {
  type: 'medical',
}, {
  type: 'dayOff',
}, {
  type: 'dayOff',
  duringDay: true,
}, {
  type: 'common',
}, {
  type: 'documents',
}];

const getDatesParams = (type, duringDay) => {
  let dateFrom;
  let dateTo;
  let rest_days_number;

  if (type === 'technical' || type === 'common' || type === 'documents' || (type === 'dayOff' && duringDay)) {
    dateTo = new Date('2022-04-22 9:30');
  }
  if (type === 'vacation' || type === 'medical' || (type === 'dayOff' && duringDay)) {
    dateFrom = new Date('2022-04-20');
    dateTo = new Date('2022-04-22');
    rest_days_number = 2;
  }

  return {
    dateFrom,
    dateTo,
    rest_days_number,
  };
};

const getRequestsFromParams = (arrayOfRequestsParams) => {
  return arrayOfRequestsParams.map((param, idx) => {
    const { type, status, isDenied, duringDay } = param;

    const {
      dateFrom,
      dateTo,
      rest_days_number,
    } = getDatesParams(type, duringDay, idx);

    const deniedComment = isDenied
      ? `Test user request denied comment with ${type} type and ${status} status for ${duringDay ? 'a several hours' : 'for a day'}`
      : null;

    return {
      id: idx + 1,
      title: `Test user request title with ${type} type and ${status} status`,
      comment: `Test user request comment with ${type} type and ${status} status`,
      type,
      status,
      dateFrom,
      dateTo,
      deniedComment,
      rest_days_number,
      dates: null, // Deprecated
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
};

module.exports = {
  up: async (queryInterface) => {
    let count = 0;
    const arrayOfRequestsParams = [];
    for (let idx = 0; idx < typeFields.length; idx++) {
      const result = [];
      for (let i = 0; i < statusFields.length; i++) {
        count++;
        result.push({
          id: count,
          ...typeFields[idx],
          status: statusFields[i],
          isDenied: statusFields[i] === 'denied',
        });
      }
      arrayOfRequestsParams.push(...result);
    }
    const requestsFields = getRequestsFromParams(arrayOfRequestsParams);
    await queryInterface.bulkInsert('requests', requestsFields, {});

    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');
    const requestUserFields = requestsFields.map((req) => {
      const randomUserId = Math.floor(Math.random() * (users.length) + 1);
      return {
        user_id: randomUserId,
        request_id: req.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert('request_users', requestUserFields, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('requests', {
      title: {
        [Op.startsWith]: 'Test user request title with',
      },
    }, {});

    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');
    await queryInterface.bulkDelete('request_users', {
      user_id: {
        [Op.lte]: users.length,
      },
    }, {});
  },
};
