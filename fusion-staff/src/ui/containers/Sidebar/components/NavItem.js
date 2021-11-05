import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { updateSidebarStatus } from 'store/global/actions';
import themes from 'ui/styles/theme/custom';

import { NavLink } from 'react-router-dom';
import { RoleCheck } from 'utils/protector';
import NavItemIcon from './NavItemIcon';

class NavItem extends PureComponent {
  onClick = () => {
    const {
      theme,
      updateSidebarStatus
    } = this.props;

    const mdSize = themes[theme].sizes.md;
    const isMobile = window.outerWidth <= mdSize || window.innerWidth <= mdSize;

    if (isMobile) {
      updateSidebarStatus();
    }
  }

  render() {
    const {
      to,
      icon,
      exact,
      title,
      forRole,
      mobileonly,
      externalLink
    } = this.props;

    return (
      <RoleCheck forRole={forRole}>
        {externalLink
          ? (
            <StyledExternalLink
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-item"
            >
              <NavItemIcon icon={icon} />

              {title}
            </StyledExternalLink>
          )
          : (
            <StyledNavLink
              to={to}
              activeClassName="navbar-item--current-address"
              mobileonly={mobileonly ? 1 : 0} // need to avoid react's warning
              className="navbar-item"
              onClick={this.onClick}
              exact={exact}
            >
              <NavItemIcon icon={icon} />

              {title}
            </StyledNavLink>
          )}
      </RoleCheck>
    );
  }
}

const LinkStyles = css`
`;

const StyledNavLink = styled(NavLink)`
  ${LinkStyles}

  ${({ mobileonly }) => (mobileonly ? css`
    @media (min-width: ${({ theme }) => theme.sizes.md + 1}px) {
      && {
        display: none;
      }
    }
  ` : '')}
`;
const StyledExternalLink = styled.a`${LinkStyles}`;

NavItem.propTypes = {
  forRole: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  to: PropTypes.string,
  icon: PropTypes.string,
  exact: PropTypes.bool,
  title: PropTypes.string,
  mobileonly: PropTypes.bool,
  externalLink: PropTypes.bool,
  theme: PropTypes.string.isRequired,
  updateSidebarStatus: PropTypes.func.isRequired
};

NavItem.defaultProps = {
  forRole: 'any',
  to: '/',
  title: '',
  externalLink: false,
  icon: '',
  exact: false,
  mobileonly: false
};

const connectFunction = connect(
  ({ global: { theme } }) => ({
    theme
  }), { updateSidebarStatus }
);

export default connectFunction(NavItem);
