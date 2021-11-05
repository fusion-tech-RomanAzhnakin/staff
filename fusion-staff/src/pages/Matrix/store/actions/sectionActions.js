import matrixAPI from 'api/matrixAPI';

import {
  updateGroup,
  updateCurrentItem,
  updateRemovedItem,
  updateSection,
} from '../actionCreators';

export const createSection = () => async (dispatch, getState) => {
  try {
    const { title, groupId, groupIndex } = getState().matrix.currentItem;
    const group = getState().matrix.groups[groupIndex];

    dispatch(updateCurrentItem(null));

    const res = await matrixAPI.createSection({
      title,
      group_id: groupId
    });

    const section = res.data.data;
    section.matrix_skills = [];

    group.matrix_sections = [...group.matrix_sections, section];

    dispatch(updateGroup(groupIndex, group));
  } catch (err) {
    console.error(err.message);
  }
};

export const renameSection = () => async (dispatch, getState) => {
  try {
    const { matrix } = getState();
    const { id, title, sectionIndex, groupIndex } = matrix.currentItem;

    const section = matrix.groups[groupIndex].matrix_sections[sectionIndex];
    section.title = title;

    dispatch(updateSection({ groupIndex, sectionIndex, section }));

    dispatch(updateCurrentItem(null));

    await matrixAPI.updateSection(id, { title });
  } catch (err) {
    console.error(err.message);
  }
};

export const removeSection = () => async (dispatch, getState) => {
  try {
    const { matrix } = getState();
    const { id, groupIndex, sectionIndex } = matrix.removedItem;

    dispatch(updateRemovedItem(null));

    await matrixAPI.removeSection(id);

    const group = matrix.groups[groupIndex];
    group.matrix_sections.splice(sectionIndex, 1);

    dispatch(updateGroup(groupIndex, group));
  } catch (err) {
    console.error(err.message);
  }
};
