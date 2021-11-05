/* eslint-disable no-console */
const db = require('../models');
const SearchBuilder = require('../../utils/SearchBuilder');

/**
 * @param {{
    title: string;
    user_id: number;
    type: string;
    comment: string;
    status: string;
    deniedComment: string;
    rest_days_number: number;
  * }} data
* @param {{
    dateFrom: Date;
    dateTo: Date;
    dates: Date[];
 * }} dates
 */
const create = async (data, dates) => {
  // TO-DO: Check dates logic here
  const payload = { ...data, ...dates };

  switch (data.type) { // eslint-disable-line default-case
    case 'technical':
    case 'common':
    case 'documents':
    case 'dayOff':
      payload.rest_days_number = 1;
      break;
    case 'medical':
    case 'vacation':
      // TO-DO: Add countRestDays logic here
      payload.rest_days_number = 999;
      break;
  }

  const newRequest = await db.request.create(data);

  await newRequest.setUsers(data.user_id);

  return newRequest.toJSON();
};

const edit = async (data) => {
  const newRequest = await db.request.findByPk(data.requestId);

  await newRequest.update(data);
  return newRequest.toJSON();
};

/**
 * @param {{
    pagination: {
      perPage: string;
      page: string;
    };
    sort: {
      sortBy: string;
      sortDirection: "straight" | "reverse";
    };
    filter: {
      search: string;
      type: string;
      status: string;
      dateFrom: Date;
      dateTo: Date;
      user_id: number;
    };
 * }} params
 */
const getList = async (params) => {
  const query = new SearchBuilder(params).buildQuery();
  query.include = [
    {
      model: db.user,
      attributes: ['id'],
      as: 'user',
      through: { attributes: [] },
    },
  ];

  const requests = await db.request.findAll(query);

  return requests;
};

module.exports = {
  create,
  getList,
  edit,
};
