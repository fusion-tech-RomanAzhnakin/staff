import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { avatarSelector } from 'utils';

import Avatar from './Avatar';
import { UserType } from 'utils/types';

class Info extends Component {
  render() {
    const { user } = this.props;
    const avatar = avatarSelector(user.avatar);

    const lastActivity = user.last_activity ? moment(user.last_activity).fromNow() : '';

    return (
      <div style={style.container}>
        <Avatar globalUser={this.props.globalUser} src={avatar} />

        <b>
          {this.props.user.firstName} {this.props.user.lastName}
        </b>
        <hr />

        {lastActivity && (
          <StyledLastActivityLabel>
            Последняя активность <b>{lastActivity}</b>
          </StyledLastActivityLabel>
        )}
      </div>
    );
  }
}

const StyledLastActivityLabel = styled.p`
  font-size: 0.7em;
`;

const style = {
  container: { fontSize: '20px' }
};

Info.propTypes = {
  user: UserType.isRequired,
  globalUser: UserType.isRequired,
};

export default Info;
