import axios from './axios';

const path = '/api/mentors';

export const getAllMentorsRequest = () => {
  return axios({
    method: 'GET',
    url: path,
  });
};

export const updateMentorRequest = (userId, mentorId) => {
  return axios({
    method: 'POST',
    url: path,
    data: { userId, mentorId }
  });
};
