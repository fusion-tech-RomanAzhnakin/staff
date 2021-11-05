import matrixAPI from 'api/matrixAPI';
import {
  setUserSkill,
  updateUserSkill as updateUserSkillAction
} from '../actionCreators';

export const createUserSkill = (data) => async (dispatch) => {
  try {
    const res = await matrixAPI.createUserSkill(data);

    const skill = res.data.data;
    skill.matrix_skill_comments = [];

    dispatch(setUserSkill({ [skill.matrix_skill_id]: skill }));
  } catch (err) {
    console.error(err.message);
  }
};

export const updateUserSkill = (skill) => async (dispatch, getState) => {
  try {
    const { userSkills, openSkill } = getState().matrix;

    await matrixAPI.editUserSkill(userSkills[openSkill.id].id, skill);

    dispatch(updateUserSkillAction({ id: openSkill.id, skill }));
  } catch (err) {
    console.error(err.message);
  }
};

export const selfSkillUpdate = (level) => async (dispatch, getState) => {
  try {
    const { openSkill } = getState().matrix;

    await matrixAPI.selfEstimate(openSkill.id, level);

    dispatch(updateUserSkillAction({
      id: openSkill.id,
      skill: { self_rating: level }
    }));
  } catch (err) {
    console.error(err.message);
  }
};
