import { createSelector } from 'reselect';

import { getFullName } from 'utils';

const getUsers = ({ enums }) => enums.usersList;

export const selectableDevUsers = createSelector(
  [getUsers],
  (usersList) => {
    if (!usersList) {
      return [];
    }

    const devUsers = Object.values(usersList).filter((user) => user.isDev);

    return devUsers.map((user) => (
      {
        value: user.id,
        label: getFullName(user, 'full') || user.login,
      }
    ));
  },
);
