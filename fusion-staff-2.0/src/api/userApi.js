import axios from 'api/axios';

const path = '/user';

export const getOne = (id) => {
  return axios.get(`${path}/${id}`);
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
      role: array;
      techRole: array;
      status: array;
      isDev: boolean;
      search: string;
    };
 * }} params
 */
export const getList = (params) => {
  return axios.get(path, { params });
};

export const find = (params) => {
  return axios.get(`${path}/find`, { params });
};

/**
 * @param {number} id
 * @param {{
 * login: string;
 * phone: string;
 * email: string;
 * slack_name: sting;
 * firstName: string;
 * firstName_ru: string;
 * lastName: string;
 * lastName_ru: string;
 * education: string;
 * education_ru: string;
 * info: string;
 * repos: array;
 * DoB: date;
 * }} data
 */
export const update = (id, data) => {
  return axios.patch(`${path}/update/${id}`, data);
};

/**
 *
 * @param {number} id
 * @param {{
 *
 * }} data
 */
export const updateFromAdmin = (id, data) => {
  return axios.patch(`${path}/update-admin/${id}`, data);
};

/**
 *
 * @param {number} id
 * @param {{
 * oldPassword: string;
 * password: string;
 * }} data
 */
export const changePassword = (id, data) => {
  return axios.patch(`${path}/change-password/${id}`, data);
};

export const deleteOne = (id) => {
  return axios.delete(`${path}/${id}`);
};

export default {
  getOne,
  getList,
  find,
  update,
  deleteOne,
  changePassword,
  updateFromAdmin,
};
