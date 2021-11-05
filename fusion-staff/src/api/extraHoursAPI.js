import axios from './axios';

export const getExtraHours = ({ order, orderBy, rowsPerPage, page, value: isProcessed, user_id }) => {
  return axios({
    method: 'GET',
    url: '/api/extra',
    params: {
      offset: page * rowsPerPage || 0,
      limit: rowsPerPage || null,
      order,
      orderBy,
      isProcessed,
      user_id
    }
  });
};

export const postExtraHours = (data) => {
  return axios({
    method: 'POST',
    url: '/api/extra',
    data
  });
};

export const updateExtraHours = (id, data) => {
  return axios({
    method: 'PUT',
    url: `/api/extra/${id}`,
    data
  });
};

export const deleteExtraHours = (id) => {
  return axios({
    method: 'DELETE',
    url: `/api/extra/${id}`
  });
};
