import matrixAPI from 'api/matrixAPI';

import { addComment, updateUserSkill } from '../actionCreators';

export const createComment = (text) => async (dispatch, getState) => {
  try {
    let newUserSkill;

    const { matrix, global } = getState();

    const existingUserSkillId = matrix.userSkills?.[matrix.openSkill.id]?.id;

    if (!existingUserSkillId) {
      const res = await matrixAPI.createUserSkill({
        user_id: matrix.selectedUser.value,
        matrix_skill_id: matrix.openSkill.id,
      });

      newUserSkill = res.data.data;
      newUserSkill.matrix_skill_comments = [];

      dispatch(updateUserSkill({ id: newUserSkill.matrix_skill_id, skill: newUserSkill }));
    }

    const skillId = existingUserSkillId || newUserSkill.id;

    const res = await matrixAPI.createComment({
      created_by: global.user.id,
      user_matrix_skill_id: skillId,
      text,
    });

    dispatch(addComment({
      id: matrix.openSkill.id,
      comment: res.data.comment,
      created_by: global.user.id,
    }));
  } catch (err) {
    console.error(err.message);
  }
};
