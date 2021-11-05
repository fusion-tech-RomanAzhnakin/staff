import { getAllUsersRequest } from 'api/userApi';
import { getAllTasksRequest } from 'api/studyTaskApi';
import {
  getStudyPlanRequest,
  createStudyPlanRequest,
  updateStudyPlanRequest
} from 'api/studyPlanApi';
import { getAllMentorsRequest, updateMentorRequest } from 'api/mentorsApi';
import { updateSpinner } from 'store/global/actions';
import {
  USERS_LOADED,
  TASKS_LOADED,
  USER_PLAN_LOADED,
  USER_PLAN_CREATED,
  MENTORS_LOADED,
  CURRENT_USER_ADDED,
  CURRENT_MENTOR_ADDED
} from './actionNames';

export const getUsers = (sortType) => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    const sort = ['lastName', sortType];
    const filter = { role: 'student', status: ['active'] };
    const { data } = await getAllUsersRequest(sort, filter);
    dispatch(loadUsers(data));
    dispatch(updateSpinner(false));
  } catch (err) {
    console.log(err);
  }
};

export const getMentors = () => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    const { data } = await getAllMentorsRequest();
    dispatch(loadMentors(data.mentors));
    dispatch(updateSpinner(false));
  } catch (err) {
    console.log(err);
  }
};

export const getTasks = (sortType = 'ASC') => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    const sort = ['title', sortType];
    const filter = { title: '' };
    const { data } = await getAllTasksRequest(sort, filter);
    dispatch(loadTasks(data));
    dispatch(updateSpinner(false));
  } catch (err) {
    console.log(err);
  }
};

export const clearPlan = () => (dispatch) => {
  try {
    dispatch(loadUserPlan(null));
  } catch (err) {
    console.log(err);
  }
};

export const getPlan = (userId) => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    const { data: plan } = await getStudyPlanRequest(userId);
    dispatch(loadUserPlan(plan));
    dispatch(updateSpinner(false));
  } catch (err) {
    console.log(err);
  }
};

export const createPlan = (userId) => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    const { data: plan } = await createStudyPlanRequest(userId);
    dispatch(createUserPlan(plan));
    dispatch(updateSpinner(false));
    return plan;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updatePlanTaskJob = (planId, data, userId) => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    await updateStudyPlanRequest(planId, data);
    const { data: plan } = await getStudyPlanRequest(userId);
    dispatch(loadUserPlan(plan));
    dispatch(updateSpinner(false));
  } catch (err) {
    console.log(err);
  }
};

export const updatePlanView = (plan) => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    dispatch(loadUserPlan(plan));
    dispatch(updateSpinner(false));
  } catch (err) {
    console.log(err);
  }
};

export const updateCurrentUser = (user) => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    dispatch(addCurrentUser(user));
    dispatch(updateSpinner(false));
  } catch (err) {
    console.log(err);
  }
};

export const updateCurrentMentor = (mentor) => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    dispatch(addCurrentMentor(mentor));
    dispatch(updateSpinner(false));
  } catch (err) {
    console.log(err);
  }
};

export const updateMentor = (userId, mentor) => async (dispatch) => {
  try {
    dispatch(updateSpinner(true));
    await updateMentorRequest(userId, mentor ? mentor.id : null);
    dispatch(addCurrentMentor(mentor));
    dispatch(updateSpinner(false));
  } catch (err) {
    console.log(err);
  }
};

export const loadUsers = (payload) => {
  return ({
    type: USERS_LOADED,
    payload
  });
};

export const loadMentors = (payload) => {
  return ({
    type: MENTORS_LOADED,
    payload
  });
};

export const loadTasks = (payload) => {
  return ({
    type: TASKS_LOADED,
    payload
  });
};

export const loadUserPlan = (payload) => {
  return ({
    type: USER_PLAN_LOADED,
    payload
  });
};

export const createUserPlan = (payload) => {
  return ({
    type: USER_PLAN_CREATED,
    payload
  });
};

export const addCurrentUser = (payload) => {
  return ({
    type: CURRENT_USER_ADDED,
    payload
  });
};

export const addCurrentMentor = (payload) => {
  return ({
    type: CURRENT_MENTOR_ADDED,
    payload
  });
};
