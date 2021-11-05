import React, { PureComponent } from 'react';
import styled from 'styled-components';

import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

class Bell extends PureComponent {
  state = { notificationsList: [] }

  componentDidMount() {
    this.setSubscriptions();
  }

  setSubscriptions = () => {
    // Use subscriptions here
  }

  render() {
    const isNotifications = Boolean(this.state.notificationsList.length);

    return (
      <StyledBell isNotifications={isNotifications}>
        {!isNotifications && <NotificationsIcon />}

        {isNotifications && <NotificationsActiveIcon />}
      </StyledBell>
    );
  }
}

const StyledBell = styled.div`
  margin-top: 5px;

  svg {
    cursor: pointer;
    fill: ${({ theme, isNotifications }) => (
    isNotifications
      ? theme.colors.primary.main
      : theme.colors.navbar.text
  )};
  }
`;

export default Bell;
