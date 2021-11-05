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

  const technologies = await db.technologies.findAll(query);

  return technologies;
};

module.exports = {
  getList,
};
