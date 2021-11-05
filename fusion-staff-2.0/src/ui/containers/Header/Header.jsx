import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import withWidth from '@material-ui/core/withWidth';

import MenuIcon from '@material-ui/icons/Menu';
import StyledHeader from 'ui/containers/Header/components/StyledHeader';
import CreationDropdown from 'ui/containers/Header/components/CreationDropdown';
import Bell from 'ui/containers/Header/components/Bell';
import UserMenu from 'ui/containers/Header/components/UserMenu';

import { isMdWidth } from 'utils';
import { toggleSidebar } from 'store/main';

// Remove when will be ready
const isBellWorks = false;

const Header = (props) => {
  const dispatch = useDispatch();
  const { isOpen, title, user } = useSelector(({ main }) => ({
    isOpen: main.isSidebarOpen,
    title: main.pageTitle,
    user: main.user,
  }));

  const toggleSidebarAction = () => dispatch(toggleSidebar());

  if (!user) {
    return null;
  }

  const isTablet = isMdWidth(props.width);

  return (
    <StyledHeader isOpen={isOpen}>
      {!isTablet && <h1 className="page-title">{title}</h1>}
      {isTablet && (
        <MenuIcon className="burger-icon" onClick={toggleSidebarAction} />
      )}

      <nav>
        <CreationDropdown />

        {isBellWorks && <Bell />}

        <UserMenu />
      </nav>
    </StyledHeader>
  );
};

Header.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(memo(Header));
