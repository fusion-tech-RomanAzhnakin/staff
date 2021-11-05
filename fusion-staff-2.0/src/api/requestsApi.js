/* eslint-disable no-console */
import axios from 'api/axios';

const path = '/request';
/**
 *
 * @param { {
 * type: string
 * comment: string;
 * title: string;
 * dateFrom: Date;
 * dateTo: Date;
 * }} data
 */

export const create = (data) => {
  return axios.post(path, data);
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
      search: string;
      type: string;
      status: string;
      dateFrom: Date;
      dateTo: Date;
      user_id: number;
    };
 * }} params
 */

export const getList = (params) => {
  return axios.get(path, { params });
};

/**
 * @param {{
    requestId: number,
    status: string,
    deniedComment: string,
    dateFrom: string,
    dateTo: string,
    title: string,
    comment: string,
 * }} data
 */

export const edit = (data) => {
  return axios.put(path, data);
};

export default {
  create,
  getList,
  edit,
};
