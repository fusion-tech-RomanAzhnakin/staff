import {
  USERS_LOADED,
  TASKS_LOADED,
  USER_PLAN_LOADED,
  USER_PLAN_CREATED,
  MENTORS_LOADED,
  CURRENT_USER_ADDED,
  CURRENT_MENTOR_ADDED
} from './actionNames';

const initialState = {
  users: [],
  tasks: [],
  mentors: [],
  userTasks: [],
  plan: null,
  currentUserId: null,
  currentUser: null,
  currentMentor: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USERS_LOADED:
      return { ...state, users: payload };

    case MENTORS_LOADED:
      return { ...state, mentors: payload };

    case TASKS_LOADED:
      return { ...state, tasks: payload };

    case USER_PLAN_LOADED:
    case USER_PLAN_CREATED:
      return { ...state, plan: payload };

    case CURRENT_USER_ADDED:
      return { ...state, currentUser: payload };

    case CURRENT_MENTOR_ADDED:
      return { ...state, currentMentor: payload };

    default:
      return state;
  }
}
