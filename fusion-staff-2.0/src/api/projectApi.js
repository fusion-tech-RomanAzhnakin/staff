// @ts-check
import axios from 'api/axios';

const path = '/project';

/**
 * @param {{
 * title: string,
 * images: Array<string>,
 * href: string,
 * description: string,
 * description_ru: string,
 * status: string,
 * role: Array<JSON>,
 * user_id: Array<number> | [],
 * technology_id: Array<number> | [],
 * }} data
 */
export const create = (data) => {
  return axios.post(path, data);
};

/**
 * @param {{
 * title: string,
 * images: Array<string>,
 * href: string,
 * description: string,
 * description_ru: string,
 * status: string,
 * role: Array<JSON>,
 * user_id: Array<number> | [],
 * technology_id: Array<number> | [],
 * id: number,
 * }} data
 */
export const edit = (data) => {
  return axios.put(path, data);
};

/**
 * @param {{
 *   pagination: {
 *     perPage: string;
 *     page: string;
 *   };
 *   sort: {
 *     sortBy: string;
 *     sortDirection: "straight" | "reverse";
 *   };
 *   filter: {
 *   };
 *   include: Array<{
 *       model: string,
 *       as: string,
 *       attributes: Array<string>
 *     }>
 * }} params
 */
export const getList = (params) => {
  return axios.get(path, { params });
};

export const getTech = () => {
  return axios.get(`${path}/tech`);
};

/**
 * @param {{
 *   id: number,
 * }} id
 */
export const deleteProject = (id) => {
  return axios.delete(path, { params: { id } });
};

export default {
  create,
  getList,
  edit,
  deleteProject,
  getTech,
};

// const pathRequest=`?pagination=${params.pagination}&filter=${params.filter}&sort=${params.sort}`;
// return axios.get(path + pathRequest);
