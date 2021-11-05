const moment = require('moment');
const db = require('../models');

const { Op, literal } = db.Sequelize;

const getUserName = (user, type = 'full', lang = 'ru') => {
  const {
    firstName: firstName_en = '',
    firstName_ru = '',

    lastName: lastName_en = '',
    lastName_ru = '',

    email = '',
  } = user;

  const firstName = (lang === 'ru' ? firstName_ru || firstName_en : firstName_en) || '';
  const lastName = (lang === 'ru' ? lastName_ru || lastName_en : lastName_en) || '';

  let fullName;

  switch (type) { // eslint-disable-line default-case
    case 'full':
      fullName = `${lastName} ${firstName}`.trim();
      break;

    case 'short':
      fullName = `${lastName} ${firstName.substring(0, 1)}.`;
      // If only a dot
      if (fullName.length === 1) {
        fullName = email;
      }
      break;
  }
  return fullName || email;
};

const getIncludeModel = (
  model = 'user',
  { attributes = ['id', 'login', 'firstName', 'lastName'] } = {}
) => ({
  include: [
    {
      model: db[model],
      attributes,
    },
  ],
});

const createFilter = ({
  title = '', hidden, offset, perPage, id,
} = {}) => {
  const filter = { where: {} };
  if (title) {
    filter.where.title = { [Op.iLike]: `%${title}%` };
  }

  if (hidden !== undefined) {
    filter.where.hidden = hidden;
  }

  if (offset) {
    filter.where.offset = offset;
  }

  if (perPage) {
    filter.where.limit = perPage;
  }

  if (id) {
    filter.where.id = id;
  }

  return filter;
};

// TODO: rename after refatoring
const createRequestFilter = (query) => {
  const blackList = ['dates'];
  const accepted = ['accept', 'completed'];
  const keys = Object.keys(query);
  return keys.reduce((accumulator, key) => {
    if (!blackList.includes(key)) {
      accumulator[key] = accepted.includes(query[key]) ? { [Op.or]: accepted } : query[key];
    }
    return accumulator;
  }, {});
};

const areDatesValid = (from, to) => moment(to).isValid() && moment(from).isValid();

/**
 * Create range dates for searching relevant requests
 * For dayOff, vacation and medical requests will also
 * take into account the intersection of dates, if the requests
 * enters into the selected range not completely
 * @param {date} fromDate - start date of range
 * @param {date} toDate - end date of range
 */
const createRequestDateRangesFilter = (fromDate, toDate) => {
  if (!fromDate || !toDate) return {};
  const from = moment(fromDate)
    .startOf('day')
    .toISOString();
  const to = moment(toDate)
    .endOf('day')
    .toISOString();
  return {
    [Op.or]: [
      {
        type: { [Op.not]: ['technical', 'common', 'documents'] },
        [Op.and]: areDatesValid(from, to)
          ? literal(`("dateFrom", "dateTo") OVERLAPS ('${from}', '${to}')`)
          : {},
      },
      {
        type: ['common', 'documents', 'technical'],
        createdAt: { [Op.lte]: to },
        dateTo: { [Op.gte]: from },
      },
    ],
  };
};

module.exports = {
  getUserName,
  getIncludeModel,
  createFilter,
  createRequestFilter,
  createRequestDateRangesFilter,
};
