const db = require('../models');
const SearchBuilder = require('../../utils/SearchBuilder');

const getList = async (params) => {
  const query = new SearchBuilder(params).buildQuery();

  const data = await db.crm_task.findAll(query);

  return data;
};

module.exports = {
  getList,
};
