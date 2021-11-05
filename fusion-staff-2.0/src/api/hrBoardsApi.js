import axios from 'api/axios';

const path = '/candidate-columns';

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
export const getColumns = (params) => {
  return axios.get(path, params);
};

export default {
  getColumns,
};
