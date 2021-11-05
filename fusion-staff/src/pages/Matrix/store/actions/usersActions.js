import matrixAPI from 'api/matrixAPI';
import { getAllUsersRequest } from 'api/userApi';
import { formatUserToSelect } from 'utils';
import {
  updateUsersList,
  updateUserSkills,
  updateSelectedUser,
} from '../actionCreators';

export const getUsers = () => async (dispatch) => {
  try {
    const res = await getAllUsersRequest();

    const usersList = res.data
      .filter((user) => (user.role !== 'student' && user.status === 'active'))
      .map((user) => formatUserToSelect(user));

    usersList.unshift({ value: null, label: 'Не выбран' });

    dispatch(updateUsersList(usersList));
  } catch (err) {
    console.error('err.message', err.message);
  }
};

export const selectUser = (userOption) => async (dispatch) => {
  try {
    dispatch(updateSelectedUser(userOption));

    const userId = userOption?.value;

    if (!userId) {
      dispatch(updateUserSkills({}));
      return;
    }

    const res = await matrixAPI.getUserSkills(userId);

    const skills = res.data.user_matrix_skills.reduce((acc, skill) => {
      acc[skill.matrix_skill_id] = skill;
      return acc;
    }, {});

    dispatch(updateUserSkills(skills));
  } catch (err) {
    console.error(err.message);
  }
};
