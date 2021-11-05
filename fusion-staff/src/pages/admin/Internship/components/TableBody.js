import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import Url from 'urls-tool';
import { withRouter } from 'react-router-dom';

import { UsersType } from 'utils/types';
import { getExpandedName } from 'utils';
import { AvatarImage } from 'ui';
import { updateCurrentUser } from '../store/actions';

class TableBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: null
    };
  }

  componentDidMount() {
    const student_id = Number(Url.getParams().object.student_id);
    if (student_id) {
      this.setState({
        selectedUserId: student_id
      });
      const user = this.props.users.find(user => user.id === student_id);
      this.props.updateCurrentUser(user);
      this.props.getPlan(student_id);
    }
  }

  clearCurrentUser = () => {
    this.setState({
      selectedUserId: null
    });
    this.props.updateCurrentUser(null);
    this.props.clearPlan();
    Url.params = {};
  };

  handleClick = (user) => {
    if (user.id === this.state.selectedUserId) {
      this.clearCurrentUser();
      return;
    }
    this.props.updateCurrentUser(user);
    this.props.getPlan(user.id);
    this.setState({
      selectedUserId: user.id
    });
    Url.params = {
      student_id: user.id
    };
  };

  render() {
    const {
      users,
      currentUserId,
    } = this.props;
    const { selectedUserId } = this.state;

    return (
      <ul className="usersTable">
        {users.map((user) => {
          const avatarSrc = _get(user, 'avatarThumbnail') ||
            _get(user, 'avatar') || '';
          const belongsToCurrentUser = user.mentor_id === currentUserId;

          return (
            <UserItem
              key={user.id}
              active={selectedUserId === user.id ? 'true' : undefined}
              highlight={belongsToCurrentUser.toString()}
            >
              <UserItemInner
                className='user-item__inner'
                onClick={() => this.handleClick(user)}
                onDoubleClick={() => this.props.history.push(`/account/${user.login}`)}
                selected={selectedUserId === user.id}
              >
                <Avatar
                  src={avatarSrc}
                  size="sm"
                />
                <div>
                  {getExpandedName(user, 'ru')}
                </div>
              </UserItemInner>
            </UserItem>
          );
        })}
      </ul>
    );
  }
}

const Avatar = styled(AvatarImage)`
  position: absolute;
  width: 38px;
  height: 38px;
  top: 7px;
  left: 7px;
`;

const UserItem = styled.li`
  border: ${props => (
    props.active === 'true' ? '2px rgba(15, 21, 204, 0.5) solid' : '2px rgba(15, 21, 204, 0) solid'
  )};
  
  & .user-item__inner:hover {
    background-color: ${props => (
    props.highlight === 'true' ? 'rgba(15, 21, 204, 0.2)' : '#eee'
  )};
  }

  &:hover {
    border: ${props => (
    props.highlight === 'true' ? '2px rgba(15, 21, 204, 0.2) solid' : (
      props.active ? '2px rgba(15, 21, 204, 0.5) solid' : '2px rgba(15, 21, 204, 0) solid'
    )
  )};
  }

  .center {
    text-align: center;
  }

  &:nth-of-type(even) {
    background-color: ${props => (
    props.highlight === 'true' ? 'rgba(15, 21, 204, 0.2)' : '#f8f8f8'
  )};
  }

  background-color: ${props => (
    props.highlight === 'true' ? 'rgba(15, 21, 204, 0.2)' : 'none'
  )};

`;

const UserItemInner = styled.div`
  font-size: 14px;
  padding: 17px;
  font-weight: ${props => (props.selected ? 600 : 400)};
  
  && {
    position: relative;
    padding-left: 60px;
  }
  a {
    color: black;
  }
`;

TableBody.propTypes = {
  users: UsersType,
  getPlan: PropTypes.func,
  clearPlan: PropTypes.func,
  currentUserId: PropTypes.number,
  updateCurrentUser: PropTypes.func,
  history: PropTypes.object,
};

TableBody.defaultProps = {
  users: [],
  getPlan: () => null,
};
export default withRouter(connect(null, { updateCurrentUser })(TableBody));
