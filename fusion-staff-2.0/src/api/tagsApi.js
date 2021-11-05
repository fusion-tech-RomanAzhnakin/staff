import axios from 'api/axios';

const path = '/tag';

/**
 * @param {{
 *  title: string,
 * }} data
 */
export const create = (data) => {
  return axios.post(path, data);
};

export const getList = () => {
  return axios.get(path);
};

export default {
  create,
  getList,
};
