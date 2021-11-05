import axios from 'api/axios';

const path = '/subscribers';

/**
* @param {number} id
 * @param {{
    user_id: number;
 * }} data
 */
export const update = (id, data) => {
  return axios.patch(`${path}/${id}`, data);
};

export default {
  update,
};
