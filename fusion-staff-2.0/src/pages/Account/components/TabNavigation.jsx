import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { setTab } from 'pages/Account/store';

const TabNavigation = () => {
  const dispatch = useDispatch();

  const tab = useSelector(({ userAccount }) => userAccount.tab);
  const { id } = useSelector(({ main }) => main.user);
  const { id: currentProfileId } = useSelector(
    ({ userAccount }) => userAccount.user,
  );
  const isOwner = id === currentProfileId;

  const changeTab = useCallback(
    (ev, value) => {
      dispatch(setTab(value));
    },
    [dispatch],
  );

  return (
    isOwner ? (
    <Tabs className="account-navigation" value={tab} onChange={changeTab}>
      <Tab label="Информация" />
      <Tab label="Настройки" />
      {/* <Tab label="Мои заявки" /> */}
    </Tabs>
    ) : (
      <Tabs className="account-navigation" value={0} onChange={changeTab}>
      <Tab label="Информация" />
    </Tabs>
    )
  );
};

export default TabNavigation;
