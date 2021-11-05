import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import withWidth from '@material-ui/core/withWidth';
import _uniqueId from 'lodash/uniqueId';

import { Link } from 'react-router-dom';
import StyledSidebar from 'ui/containers/Sidebar/components/StyledSidebar';
import NavMenu from 'ui/containers/Sidebar/components/NavMenu';
import StyledSwipeableDrawer from 'ui/containers/Sidebar/components/StyledSwipeableDrawer';

import { toggleSidebar } from 'store/main';
import { routePaths } from 'utils/constants';
import { isMdWidth } from 'utils';
import { UserType } from 'utils/types';
import logoIcon from '../../images/logo.svg';

const SIDEBAR_TOGGLING_INTERVAL = 250;
class Sidebar extends PureComponent {
  openSidebar = () => {
    if (!this.props.user) { return; }
    this.props.toggleSidebar(true);
  }

  closeSidebar = () => { this.props.toggleSidebar(false); }

  enterId = null

  leaveId = null

  handleMouseEnter = () => {
    const id = _uniqueId();
    this.enterId = id;
    this.leaveId = null;

    setTimeout(() => {
      if (this.enterId === id) {
        this.openSidebar();
      }
    }, SIDEBAR_TOGGLING_INTERVAL);
  }

  handleMouseLeave = () => {
    const id = _uniqueId();
    this.leaveId = id;
    this.enterId = null;

    setTimeout(() => {
      if (this.leaveId === id) {
        this.closeSidebar();
      }
    }, SIDEBAR_TOGGLING_INTERVAL);
  }

  render() {
    const isUser = Boolean(this.props.user && this.props.user?.status === 'active');
    const isTablet = isMdWidth(this.props.width);

    return (
      <>
        {(!isTablet || !isUser) && (
          <StyledSidebar
            isOpen={this.props.isOpen}
            isUser={isUser}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <header>
              <Link to={routePaths.home}>
                <img src={`${process.env.PUBLIC_URL}/logo-circle.svg`} alt="Logo circle" className="logo-circle" />
                <img src={logoIcon} alt="Logo" className="logo" />
              </Link>
            </header>

            {isUser && <NavMenu isTablet={isTablet} />}

            <RootLeftPadding isUser={isUser} />
          </StyledSidebar>
        )}
        {(isTablet && isUser) && (
          <StyledSwipeableDrawer
            open={this.props.isOpen}
            onClose={this.closeSidebar}
            onOpen={this.openSidebar}
            hysteresis={0.05}
          // transitionDuration={100}
          >
            <NavMenu isTablet={isTablet} />
          </StyledSwipeableDrawer>
        )}
      </>
    );
  }
}

const RootLeftPadding = createGlobalStyle`
  #root {
    padding-left: ${({ isUser, theme }) => (isUser ? theme.sidebar.width.closed : 0)};
  }
`;

Sidebar.propTypes = {
  user: UserType,
  isOpen: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  user: null,
};

const connectFunction = connect(
  ({ main }) => ({
    isOpen: main.isSidebarOpen,
    user: main.user,
  }),
  { toggleSidebar },
);

export default withWidth()(connectFunction(Sidebar));
