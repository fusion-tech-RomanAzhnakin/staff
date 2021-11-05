import {
  SET_GROUPS,
  UPDATE_GROUP,

  UPDATE_CURRENT_ITEM,
  UPDATE_OPEN_SKILL,
  UPDATE_USERS_LIST,
  UPDATE_SELECTED_USER,
  UPDATE_SECTION,

  UPDATE_SKILL,
  SET_USER_SKILL,

  UPDATE_USER_SKILLS,
  UPDATE_USER_SKILL,

  UPDATE_REMOVED_ITEM,
  ADD_COMMENT,

  SET_GOD_MODE,
} from './actionNames';

export const setGroups = (data) => ({
  type: SET_GROUPS,
  data,
});

export const updateGroup = (groupIndex, group) => ({
  type: UPDATE_GROUP,
  data: { groupIndex, group },
});

export const updateCurrentItem = (data) => ({
  type: UPDATE_CURRENT_ITEM,
  data,
});

export const updateOpenSkill = (data) => ({
  type: UPDATE_OPEN_SKILL,
  data,
});

export const updateUsersList = (data) => ({
  type: UPDATE_USERS_LIST,
  data,
});

export const updateSelectedUser = (data) => ({
  type: UPDATE_SELECTED_USER,
  data,
});

export const updateSection = (data) => ({
  type: UPDATE_SECTION,
  data,
});

export const updateSkill = (data) => ({
  type: UPDATE_SKILL,
  data,
});

export const setUserSkill = (data) => ({
  type: SET_USER_SKILL,
  data,
});

export const updateUserSkills = (data) => ({
  type: UPDATE_USER_SKILLS,
  data,
});

export const updateUserSkill = (data) => ({
  type: UPDATE_USER_SKILL,
  data,
});

export const updateRemovedItem = (data) => ({
  type: UPDATE_REMOVED_ITEM,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT,
  data,
});

export const updateGodMode = (data) => {
  return ({
    type: SET_GOD_MODE,
    data,
  });
};
