import customAxios from 'api/axios';

const path = '/crm-task';

const getList = (params) => {
  return customAxios.get(path, { params });
};

export default {
  getList,
};
