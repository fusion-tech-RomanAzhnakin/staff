import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Collapse from '@material-ui/core/Collapse';
import StyledPage from 'pages/Account/components/UserInfo/UserInfo.style';
import UserView from 'pages/Account/components/UserInfo/components/UserView';
import UserForm from 'pages/Account/components/UserInfo/components/UserForm';
import ChangePassword from 'pages/Account/components/UserInfo/components/ChangePassword';

import { useTabCheck } from 'pages/Account/customUseEffect';

const UserInfo = () => {
  const [isEdit, setIsEdit] = useState(false);
  const isSelected = useTabCheck('info');
  const user = useSelector(({ userAccount }) => userAccount.user);
  const userMain = useSelector(({ main }) => main.user);
  const isOwner = userMain.id === user.id;

  const toggleEdit = () => setIsEdit(!isEdit);

  if (!isSelected) { return null; }

  return (
    <StyledPage>
      <Collapse in={!isEdit}>
        <UserView
          toggleEdit={toggleEdit}
        />
      </Collapse>

      <Collapse in={isEdit}>
        <UserForm toggleEdit={toggleEdit} />

        {isOwner && <ChangePassword toggleEdit={toggleEdit} />}
      </Collapse>
    </StyledPage>
  );
};

export default UserInfo;
