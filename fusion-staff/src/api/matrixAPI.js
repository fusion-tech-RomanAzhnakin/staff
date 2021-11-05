import axios from './axios';

export const getGroups = () => axios({
  method: 'GET',
  url: '/api/matrix/groups'
});

export const createGroup = (data) => axios({
  method: 'POST',
  url: '/api/matrix/groups',
  data
});

export const updateGroup = (id, data) => axios({
  method: 'PUT',
  url: `/api/matrix/groups/${id}`,
  data
});

export const removeGroup = (id) => axios({
  method: 'DELETE',
  url: `/api/matrix/groups/${id}`
});

export const createSection = (data) => axios({
  method: 'POST',
  url: '/api/matrix/sections',
  data
});

export const updateSection = (id, data) => axios({
  method: 'PUT',
  url: `/api/matrix/sections/${id}`,
  data
});

export const removeSection = (id) => axios({
  method: 'DELETE',
  url: `/api/matrix/sections/${id}`
});

export const createSkill = (data) => axios({
  method: 'POST',
  url: '/api/matrix/skills',
  data
});

export const updateSkill = (id, data) => axios({
  method: 'PUT',
  url: `/api/matrix/skills/${id}`,
  data
});

export const removeSkill = (id) => axios({
  method: 'DELETE',
  url: `/api/matrix/skills/${id}`
});

export const createUserSkill = (data) => axios({
  method: 'POST',
  url: '/api/matrix/user-skills',
  data
});

export const getUserSkills = (id) => axios({
  method: 'GET',
  url: `/api/matrix/user-skills/${id}`
});

export const editUserSkill = (id, data) => axios({
  method: 'PUT',
  url: `/api/matrix/user-skills/${id}`,
  data
});

export const selfEstimate = (id, level) => axios({
  method: 'PUT',
  url: `/api/matrix/user-skills/self/${id}`,
  data: { selfRating: level },
});

export const createComment = (data) => axios({
  method: 'POST',
  url: '/api/matrix/user-skill-comments',
  data
});

export default {
  getGroups,
  createGroup,
  updateGroup,
  removeGroup,
  createSection,
  updateSection,
  removeSection,
  createSkill,
  removeSkill,
  updateSkill,
  createUserSkill,
  getUserSkills,
  editUserSkill,
  selfEstimate,
  createComment,
};
