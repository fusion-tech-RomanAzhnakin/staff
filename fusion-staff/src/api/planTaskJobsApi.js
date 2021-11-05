import axios from './axios';

const path = '/api/plan-task-jobs';

export const getPlanTaskJobsTimeFrames = (taskJobs, planId) => {
  const taskJobIds = taskJobs.map((taskJob) => taskJob.id);
  return axios({
    method: 'GET',
    url: `${path}/getTimeFrames`,
    params: { taskJobIds, planId }
  });
};

export const deletePlanTaskJobRequest = (id) => {
  return axios({
    method: 'DELETE',
    url: `${path}/${id}`
  });
};

export default null;
