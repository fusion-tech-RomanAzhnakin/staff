import Url from 'urls-tool';

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

const initialStore = {
  groups: [],
  currentItem: null,
  openSkill: null,
  usersList: [],
  selectedUser: null,
  userSkills: {},
  removedItem: null,
  godMode: false,
};

export default (store = initialStore, { type, data }) => {
  switch (type) {
    case SET_GROUPS:
      return {
        ...store,
        groups: data,
      };

    case UPDATE_GROUP: {
      const { groupIndex, group } = data;
      const { groups } = store;

      groups[groupIndex] = { ...group };

      return {
        ...store,
        groups,
      };
    }

    case UPDATE_CURRENT_ITEM:
      return {
        ...store,
        currentItem: data,
      };

    case UPDATE_OPEN_SKILL: {
      data
        ? Url.params = ['skill', data.id]
        : Url.params = ['skill'];

      return {
        ...store,
        openSkill: data,
      };
    }

    case UPDATE_USERS_LIST:
      return {
        ...store,
        usersList: data,
      };

    case UPDATE_SELECTED_USER: {
      Url.params = ['user', data?.value];

      return {
        ...store,
        selectedUser: data,
      };
    }

    case UPDATE_SECTION: {
      const { groupIndex, sectionIndex, section } = data;

      const { groups } = store;

      groups[groupIndex].matrix_sections[sectionIndex] = { ...section };

      return {
        ...store,
        groups
      };
    }

    case UPDATE_SKILL: {
      const { groups } = store;
      const { skillIndex, sectionIndex, groupIndex } = data;

      // The skill can be moved between cells
      groups[groupIndex].matrix_sections[sectionIndex] = {
        ...groups[groupIndex].matrix_sections[sectionIndex]
      };

      groups[groupIndex].matrix_sections[sectionIndex].matrix_skills[skillIndex] =
        { ...data };

      return {
        ...store,
        groups
      };
    }

    case SET_USER_SKILL: {
      const userSkills = { ...store.userSkills, ...data };

      return {
        ...store,
        userSkills,
      };
    }

    case UPDATE_USER_SKILLS:
      return {
        ...store,
        userSkills: data,
      };

    case UPDATE_USER_SKILL: {
      const { id, skill } = data;

      const { userSkills } = store;

      userSkills[id] = {
        ...userSkills[id],
        ...skill,
      };

      return {
        ...store,
        userSkills
      };
    }

    case UPDATE_REMOVED_ITEM:
      return {
        ...store,
        removedItem: data,
      };

    case ADD_COMMENT: {
      const { id, comment } = data;

      const userSkills = { ...store.userSkills };

      userSkills[id] = { ...userSkills[id] };

      userSkills[id].matrix_skill_comments = [
        ...userSkills[id].matrix_skill_comments,
        comment
      ];

      return {
        ...store,
        userSkills
      };
    }

    case SET_GOD_MODE:
      return {
        ...store,
        godMode: data
      };


    default:
      return store;
  }
};
