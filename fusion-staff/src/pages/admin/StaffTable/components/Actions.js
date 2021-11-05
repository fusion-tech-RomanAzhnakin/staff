import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import ChangeUserRole from './ChangeUserRole';
import ChangeUserStatus from './ChangeUserStatus';
import ChangeUserTechRole from './ChangeUserTechRole';
import UserStatisticalModal from './UserStatisticalModal';

import {
  Popover,
  Button,
  MenuList,
  MenuItem,
  TableCell,
} from '@material-ui/core';

import { UserType } from 'utils/types';
import { updateUserByAdminRequest } from 'api/userApi';

const connectFunction = connect((state) => ({
  globalUser: state.global.user,
}));

class Actions extends Component {
  state = {
    openRole: false,
    openTechRole: false,
    showStatistic: false,
    showPlan: false,
    roleTarget: null,
    openStatus: false,
    statusTarget: null,
    anchorEl: null,
  };

  toggleRole = (e) => {
    const { openRole } = this.state;
    this.setState({
      openRole: !openRole,
      roleTarget: e.target,
    });
  };

  toggleTechRole = (e) => {
    const { openTechRole } = this.state;
    this.setState({
      openTechRole: !openTechRole,
      roleTarget: e.target,
    });
  };

  closeRole = () => {
    this.setState({
      openRole: false,
    });
  };

  closeTechRole = () => {
    this.setState({
      openTechRole: false,
    });
  };

  toggleStatus = (e) => {
    const { openStatus } = this.state;
    this.setState({
      openStatus: !openStatus,
      statusTarget: e.target,
    });
  };

  closeStatus = () => {
    this.setState({
      openStatus: false,
    });
  };

  onRoleChange = async (value) => {
    this.setState({
      openRole: false,
    });
    if (this.props.user.role === value) {
      return;
    }
    try {
      await updateUserByAdminRequest(this.props.user.id, { role: value });
      this.props.getArr();
    } catch (err) {
      console.log(err);
    }
  };

  onTechRoleChange = async (value) => {
    this.setState({
      openTechRole: false,
    });
    if (this.props.user.techRole === value) {
      return;
    }
    try {
      await updateUserByAdminRequest(this.props.user.id, { tech_role: value });
      this.props.getArr();
    } catch (err) {
      console.log(err);
    }
  };

  onStatusChange = async (value) => {
    this.setState({
      openStatus: false,
    });
    if (this.props.user.status === value) {
      return;
    }
    try {
      await updateUserByAdminRequest(this.props.user.id, { status: value });
      this.props.getArr();
    } catch (err) {
      console.log(err);
    }
  };

  changeModalStatus = () => {
    const { showStatistic } = this.state;
    this.setState({
      showStatistic: !showStatistic,
    });
  };

  changeStudyPlan = () => {
    const { showPlan } = this.state;
    this.setState({
      showPlan: !showPlan,
    });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { user, globalUser } = this.props;
    return (
      <StyledTableCell>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          variant="outlined"
          color="primary"
          className="action-button"
          disabled={
            (globalUser.role !== 'admin' && user.role === 'admin') ||
            (globalUser.role !== 'admin' && globalUser.id === user.id)
          }
        >
          Действия
        </Button>

        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MenuList id="simple-menu">
            {globalUser.role === 'admin' && globalUser.login !== user.login && (
              <MenuItem onClick={this.toggleRole}>Сменить роль </MenuItem>
            )}

            {globalUser.role === 'admin' && (
              <MenuItem onClick={this.toggleTechRole}>
                Сменить должность
              </MenuItem>
            )}

            {(user.role !== 'admin' ||
              globalUser.role === 'admin' ||
              globalUser.role === 'hr') &&
              globalUser.login !== user.login && (
                <MenuItem onClick={this.toggleStatus}>Сменить статус</MenuItem>
            )}

            {user.role === 'student' && (
              <MenuItem>
                <StyledLink to={`internship?student_id=${user.id}`}>
                  Учебный план
                </StyledLink>
              </MenuItem>
            )}

            {globalUser.role === 'admin' && (
              <MenuItem onClick={this.changeModalStatus}>Статистика</MenuItem>
            )}
          </MenuList>
        </Popover>

        <UserStatisticalModal
          show={this.state.showStatistic}
          onHide={this.changeModalStatus}
          user={user}
          globalUser={globalUser}
        />
        <ChangeUserRole
          click={this.onRoleChange}
          show={this.state.openRole}
          target={this.state.roleTarget}
          onHide={this.closeRole}
        />
        <ChangeUserTechRole
          click={this.onTechRoleChange}
          show={this.state.openTechRole}
          target={this.state.roleTarget}
          onHide={this.closeTechRole}
        />
        <ChangeUserStatus
          click={this.onStatusChange}
          show={this.state.openStatus}
          target={this.state.statusTarget}
          onHide={this.closeStatus}
        />
      </StyledTableCell>
    );
  }
}

const StyledTableCell = styled(TableCell)`
  width: 90px;
  padding: 0;

  .action-button {
    width: 100%;
    margin: 0 auto;
  }
`;

const StyledLink = styled(Link)`
  color: #000000;
`;

Actions.propTypes = {
  getArr: PropTypes.func.isRequired,
  globalUser: UserType.isRequired,
  user: UserType.isRequired,
};

export default connectFunction(Actions);
