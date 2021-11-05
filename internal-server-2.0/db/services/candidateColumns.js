const db = require('../models');
const SearchBuilder = require('../../utils/SearchBuilder');

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
    };
 * }} params
 */
const getList = async (params) => {
  const query = new SearchBuilder(params).buildQuery();

  const columns = await db.candidate_columns.findAll(query);

  return columns;
};

module.exports = {
  getList,
};
