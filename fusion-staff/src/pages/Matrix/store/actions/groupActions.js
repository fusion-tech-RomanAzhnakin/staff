import matrixAPI from 'api/matrixAPI';

import {
  setGroups,
  updateGroup,
  updateRemovedItem,
  updateCurrentItem,
} from '../actionCreators';

export const getGroups = () => async (dispatch) => {
  try {
    const res = await matrixAPI.getGroups();

    dispatch(setGroups(res.data.data));
  } catch (err) {
    console.error(err.message);
  }
};

export const createGroup = () => async (dispatch, getState) => {
  try {
    const { currentItem, groups } = getState().matrix;

    dispatch(updateCurrentItem(null));

    const res = await matrixAPI.createGroup({ title: currentItem.title });

    const group = res.data.data;

    // new group will have matrix section
    group.matrix_sections = [];

    dispatch(setGroups([...groups, group]));
  } catch (err) {
    console.error(err.message);
  }
};

export const renameGroup = () => async (dispatch, getState) => {
  try {
    const { id, title, groupIndex } = getState().matrix.currentItem;

    dispatch(updateCurrentItem(null));

    await matrixAPI.updateGroup(id, { title });

    const group = getState().matrix.groups[groupIndex];
    group.title = title;

    dispatch(updateGroup(groupIndex, group));
  } catch (err) {
    console.error(err.message);
  }
};

export const removeGroup = () => async (dispatch, getState) => {
  try {
    const { id } = getState().matrix.removedItem;

    dispatch(updateRemovedItem(null));

    await matrixAPI.removeGroup(id);

    dispatch(setGroups(getState().matrix.groups
      .filter((group) => group.id !== id)));
  } catch (err) {
    console.error(err.message);
  }
};
