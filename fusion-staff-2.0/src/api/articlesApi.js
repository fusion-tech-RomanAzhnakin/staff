import axios from 'api/axios';

const path = '/articles';

/**
 * @param {{
 *  link: string,
 *  tags: number[],
 * }} data
 */
export const create = (data) => {
  return axios.post(path, data);
};

/**
 * @param {{
 *  sort: {
 *    sortBy: string;
 *    sortDirection: 'straight' | 'reverse';
 *  };
 * }} params
 */
export const getList = (params) => {
  return axios.get(path, { params });
};

/**
 * @param {{
 *  sort: {
 *    sortBy: string;
 *    sortDirection: 'straight' | 'reverse';
 *  };
 *  filter: {
 *    search: string,
 *    added_by: number[],
 *    tag_id: number[],
 *  };
 * }} params
 */
export const getFilteredList = (params) => {
  return axios.get(`${path}/filtered`, { params });
};

/**
 * @param {number} id
 */
export const deleteOne = (id) => {
  return axios.delete(`${path}/${id}`);
};

export default {
  create,
  getList,
  getFilteredList,
  deleteOne,
};
