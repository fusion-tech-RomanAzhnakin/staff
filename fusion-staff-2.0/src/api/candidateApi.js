import axios from 'api/axios';

const path = '/candidate';

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

/**
 * @param {{
    firstName: string;
    lastName: string;
    social: Array<string[]>;
    job_experience: string;
    repo: Array<string[]>;
    english_level: string;
    additional_info: string;
    army: boolean;
    studying: boolean;
    hr_id: number;
    column_id: number;
    technologies:Array<object[]>;
 * }} data
 */
export const create = (data) => {
  return axios.post(path, data);
};

/**
 * @param {number} id
 * @param {{
    firstName: string;
    lastName: string;
    social: Array<string[]>;
    job_experience: string;
    repo: Array<string[]>;
    english_level: string;
    additional_info: string;
    army: boolean;
    studying: boolean;
    hr_id: number;
    column_id: number;
    technologies:Array<object[]>;
 * }} data
 */
export const update = (id, data) => {
  return axios.patch(`${path}/${id}`, data);
};

/**
 * @param {number} id
 */
export const deleteOne = (id) => {
  return axios.delete(`${path}/${id}`);
};

export default {
  getAll,
  create,
  update,
  deleteOne,
};
