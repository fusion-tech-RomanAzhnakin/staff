import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';

import { updateTheme } from 'store/main';
import { useTabCheck } from 'pages/Account/customUseEffect';
import { setTab } from 'pages/Account/store';

const UserSettings = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(({ main }) => main.user);
  const { id: currentProfileId } = useSelector(
    ({ userAccount }) => userAccount.user,
  );
  const isOwner = id === currentProfileId;
  const theme = useSelector(({ main }) => main.theme);
  const isSelected = useTabCheck('settings');
  const isDark = useMemo(() => theme === 'dark', [theme]);

  const changeTheme = useCallback(() => {
    const newTheme = isDark ? 'main' : 'dark';

    dispatch(updateTheme(newTheme));
  }, [dispatch, isDark]);

  if (!isOwner && isSelected) {
    dispatch(setTab(0));
  }
  if (!isSelected) { return null; }

  return (
    <div>
      <InputLabel>
        Тёмная тема:

        <Switch onChange={changeTheme} checked={isDark} />
      </InputLabel>
    </div>
  );
};

export default UserSettings;
