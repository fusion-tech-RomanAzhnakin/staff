import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';

import { userStatus, getUserName } from 'utils';

import { userRoleNames, userTechRolesNames } from 'utils/constants';
import { RoleCheck } from 'utils/protector';

import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@material-ui/core';
import Actions from './Actions';
import { updateUserByAdminRequest } from 'api/userApi';
import { UserType } from 'utils/types';

class Body extends Component {
  changeDevelopFlag = async (id, isDev) => {
    if (this.props.globalUser.role !== 'admin') {
      return;
    }
    await updateUserByAdminRequest(id, { isDev: !isDev });
    this.props.getArr();
  };

  render() {
    const { users } = this.props;
    return (
      <tbody className="usersTable">
        {users.map((user) => {
          return (
            <StyledTr key={user.id}>
              <SizeLimitTd>
                <Link to={`/account/${user.login}`}>
                  {getUserName(user)}
                </Link>
              </SizeLimitTd>

              <SizeLimitTd>{user.email}</SizeLimitTd>

              <IsDevTd
                onClick={() => this.changeDevelopFlag(user.id, user.isDev)}
                isDev={user.isDev}
              >
                {user.isDev ? (
                  <DoneOutlinedIcon />
                ) : (
                  <DoneOutlineOutlinedIcon />
                )}
              </IsDevTd>

              <SizeLimitTd>{userRoleNames[user.role]}</SizeLimitTd>

              <SizeLimitTd>{userTechRolesNames[user.tech_role]}</SizeLimitTd>

              <SizeLimitTd>{userStatus[user.status]}</SizeLimitTd>

              <RoleCheck forRole={['admin', 'sales', 'hr']}>
                <Actions user={user} getArr={this.props.getArr} />
              </RoleCheck>
            </StyledTr>
          );
        })}
      </tbody>
    );
  }
}

const StyledTr = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f8f8f8;
  }
`;

const SizeLimitTd = styled(TableCell)`
  max-width: 10px;
  word-wrap: break-word;
  font-size: 14px;

  && {
    text-align: center;
    border-right: 1px solid #e0e0e0;
    padding: 0 2px;
  }

  a {
    color: black;
  }
`;

const IsDevTd = styled(SizeLimitTd)`
  cursor: pointer;
  svg {
    ${({ isDev }) => (!isDev
    ? css`
            color: #a7a7a7;
          `
    : css`
            font-size: 35px;
            color: #449d44;
          `)}
  }
`;

Body.propTypes = {
  getArr: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserType).isRequired,
  globalUser: UserType.isRequired,
};

const connectFunction = connect((state) => ({
  globalUser: state.global.user,
}));
export default connectFunction(Body);
