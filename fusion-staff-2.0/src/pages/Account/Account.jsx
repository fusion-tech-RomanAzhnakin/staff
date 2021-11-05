import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import StyledPage from 'pages/Account/Account.style';
import TabNavigation from 'pages/Account/components/TabNavigation';
import UserInfo from 'pages/Account/components/UserInfo/UserInfo';
import UserSettings from 'pages/Account/components/UserSettings';
import Page404 from 'pages/Page404';

import { getUser } from 'pages/Account/store/thunks';
// import UserRequests from './components/UserRequests/UserRequests';

const Account = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(({ userAccount }) => userAccount.user);
  const [isLodaded, setIsLodaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getUser(+id));
      setIsLodaded(true);
    })();
  }, [id, dispatch]);

  if (!isLodaded) { return null; }
  if (!user) { return <Page404 />; }

  return (
    <StyledPage>
      <TabNavigation />
      <UserInfo />
      <UserSettings />
      {/* <UserRequests /> */}
    </StyledPage>
  );
};

export default memo(Account);
