import axios from './axios';

const path = '/api/taskjob';

export const createTaskRequest = (data) => {
  return axios({
    method: 'POST',
    url: path,
    data
  });
};

export const getAllTasksRequest = (
  sort = ['title', 'ASC'],
  filter = { title: '' }
) => {
  return axios({
    method: 'GET',
    url: path,
    params: { sort, filter }
  });
};

export const getTasksByUserRequest = (
  userId
) => {
  return axios({
    method: 'GET',
    url: path,
    params: { userId }
  });
};

export const updateTaskStatusRequest = (id, data) => {
  return axios({
    method: 'PUT',
    url: `/api/plan/taskJobInPlan/${id}`,
    data
  });
};

export const updateTaskRequest = (id, data) => {
  return axios({
    method: 'PUT',
    url: `${path}/${id}`,
    data
  });
};

export const deleteTaskRequest = (id) => {
  return axios({
    method: 'DELETE',
    url: `${path}/${id}`
  });
};

export default null;
