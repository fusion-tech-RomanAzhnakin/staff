import axios from 'api/axios';

const path = '/technology';

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
export const getAll = (params) => {
  return axios.get(path, params);
};
export default {
  getAll,
};
