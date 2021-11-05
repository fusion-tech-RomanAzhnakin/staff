import axios from 'api/axios';

const path = '/messages';

/**
 * @param {number} id
 */
export const getAll = (id) => {
  return axios.get(`${path}/${id}`);
};

export default {
  getAll,
};
