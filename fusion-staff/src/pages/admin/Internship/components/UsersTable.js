import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Table, Paper } from '@material-ui/core';
import TableHeader from 'pages/admin/Internship/components/TableHeader';
import TableBody from 'pages/admin/Internship/components/TableBody';

import { UsersType, UserType } from 'utils/types';

const UsersTable = ({
  users,
  applySort,
  getPlan,
  clearPlan,
  currentUserId,
  currentUser
}) => {
  return (
    <StyledPaper>
      <Table>
        <TableHeader applySort={applySort} />
      </Table>
      <TableBody
        users={users}
        getPlan={getPlan}
        clearPlan={clearPlan}
        currentUserId={currentUserId}
        currentUser={currentUser}
      />
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  overflow-x: auto;
  width: 32%;
  border: 1px solid #e0e0e0;
  background-color: none;

  & .usersTable {
    margin: 0;
    padding: 5px;
    list-style: none;
  }

  @media (max-width: 1300px) {
    min-width: 300px;
    overflow: unset;
    margin: 0 20px;
  }
`;

UsersTable.propTypes = {
  users: UsersType,
  currentUser: UserType,
  applySort: PropTypes.func,
  getPlan: PropTypes.func,
  clearPlan: PropTypes.func,
  currentUserId: PropTypes.number
};

UsersTable.defaultProps = {
  users: [],
  applySort: () => null,
  getPlan: () => null,
};

export default UsersTable;
