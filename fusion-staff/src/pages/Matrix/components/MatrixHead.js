import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Url from 'urls-tool';

import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { SelectWrapper } from 'ui';
import { RoleCheck } from 'utils/protector';

import { getUsers, selectUser } from '../store/actions/usersActions';
import { updateCurrentItem, updateGodMode } from '../store/actionCreators';
import { types } from 'pages/Matrix/constants';
import { formatUserToSelect } from 'utils';
import { UserType } from 'utils/types';
import { FormControlLabel, Switch } from '@material-ui/core';

class MatrixHead extends React.PureComponent {
  componentDidMount() {
    this.getUsers();
  }

  componentWillUnmount() {
    this.props.selectUser(null);
    this.props.updateGodMode(false);
  }

  getUsers = async () => {
    await this.props.getUsers();

    const { user: selectedUserId } = Url.getParams().object;

    if (selectedUserId) {
      const selectedUser = this.props.usersList.find((user) => user.value === +selectedUserId);

      this.props.selectUser(selectedUser);

      return;
    }

    if (this.props.user.role !== 'admin' && this.props.user.role !== 'student') {
      this.props.selectUser(formatUserToSelect(this.props.user));
    }
  }

  createGroup = () => {
    this.props.updateCurrentItem({ type: types.group });
  }

  handleChangeGodMode = (event) => {
    this.props.updateGodMode(event.target.checked);
  };

  render() {
    return (
      <MatrixHeadWrapper>
        <RoleCheck forRole="any">
          <div className="control">
            <SelectWrapper>
              <Select
                options={this.props.usersList}
                value={this.props.selectedUser || this.props.usersList[0]}
                onChange={this.props.selectUser}
                classNamePrefix="select"
              />
            </SelectWrapper>

            <RoleCheck forRole="admin">
              <div className="switch">
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={this.props.godMode}
                      onChange={this.handleChangeGodMode}
                      color="primary"
                    />
                  }
                  label="Редактирование"
                />
              </div>
            </RoleCheck>
          </div>
        </RoleCheck>

        <RoleCheck forRole="admin">
          {this.props.godMode &&
            <Button
              onClick={this.createGroup}
              variant="outlined"
              className="matrix-btn"
            >
              + добавить группу
            </Button>
          }
        </RoleCheck>
      </MatrixHeadWrapper>
    );
  }
}

const MatrixHeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 28px;

  .control {
    display: flex;
    flex-direction: row;
    align-items: center;
    &* {
      margin-right: 36px;
    }
  }
  .switch {
    margin-left: 36px;
  }
  .switch-label {
    color: #eee;
  }
`;

MatrixHead.propTypes = {
  user: UserType.isRequired,
  usersList: PropTypes.array,
  selectedUser: PropTypes.object,
  getUsers: PropTypes.func,
  selectUser: PropTypes.func,
  updateCurrentItem: PropTypes.func,
  godMode: PropTypes.bool,
  updateGodMode: PropTypes.func,
};

MatrixHead.defaultProps = {
  usersList: [],
  getUsers: () => null,
  selectUser: () => null,
  updateCurrentItem: () => null,
  godMode: false,
  updateGodMode: () => null,
};

const connectFunction = connect(
  (store) => ({
    user: store.global.user,
    usersList: store.matrix.usersList,
    selectedUser: store.matrix.selectedUser,
    godMode: store.matrix.godMode,
  }), {
    getUsers,
    selectUser,
    updateCurrentItem,
    updateGodMode,
  }
);

export default connectFunction(MatrixHead);
