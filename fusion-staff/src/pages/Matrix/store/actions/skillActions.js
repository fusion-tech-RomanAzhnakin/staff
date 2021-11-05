import matrixAPI from 'api/matrixAPI';

import {
  updateSection,
  updateRemovedItem,
  updateSkill as updateSkillAction,
  updateOpenSkill,
} from '../actionCreators';

export const createSkill = (data) => async (dispatch, getState) => {
  try {
    const { matrix } = getState();
    const { openSkill, groups } = matrix;
    const { groupIndex, sectionIndex } = openSkill;

    const { title, description } = data;

    let { level } = data;
    if (level === 'none') { level = null; }

    const { id } = groups[groupIndex].matrix_sections[sectionIndex];

    const res = await matrixAPI.createSkill({
      title,
      description,
      level,
      section_id: id
    });

    const resultSkill = res.data.data;

    const section = matrix.groups[groupIndex].matrix_sections[sectionIndex];

    section.matrix_skills = [...section.matrix_skills, resultSkill];

    dispatch(updateSection({ groupIndex, sectionIndex, section }));
  } catch (err) {
    console.error(err.message);
  }
};

export const updateSkill = (data) => async (dispatch, getState) => {
  try {
    const { openSkill } = getState().matrix;

    await matrixAPI.updateSkill(openSkill.id, data);

    dispatch(updateOpenSkill({ ...openSkill, ...data }));

    dispatch(updateSkillAction({ ...openSkill, ...data }));
  } catch (err) {
    console.error(err.message);
  }
};

export const removeSkill = () => async (dispatch, getState) => {
  try {
    const { matrix } = getState();
    const { id, groupIndex, sectionIndex, skillIndex } = matrix.removedItem;

    dispatch(updateRemovedItem(null));

    dispatch(updateOpenSkill(null));

    await matrixAPI.removeSkill(id);

    const section = matrix.groups[groupIndex].matrix_sections[sectionIndex];

    section.matrix_skills.splice(skillIndex, 1);

    dispatch(updateSection({ groupIndex, sectionIndex, section }));
  } catch (err) {
    console.error(err.message);
  }
};
