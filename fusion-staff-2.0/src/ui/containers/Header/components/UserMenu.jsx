import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from 'ui/components/Avatar';
import StyledNavLink from 'ui/containers/Header/components/StyledNavLink';

import { routePaths } from 'utils/constants';
import { logOut } from 'utils';
import { useSelector } from 'react-redux';

const UserMenu = () => {
  const [anchor, setAnchor] = useState(null);
  const user = useSelector(({ main }) => main.user);

  const toggleAnchor = (ev) => {
    if (anchor) {
      return setAnchor(null);
    }

    setAnchor(ev.currentTarget);
  };

  const onLogOutClick = useCallback(() => {
    setAnchor(false);
    logOut();
  }, []);

  return (
    <>
      <StyledAvatar
        me
        withTolltip={false}
        onClick={toggleAnchor}
      />

      <Menu
        onClose={toggleAnchor}
        open={Boolean(anchor)}
        anchorEl={anchor}
        getContentAnchorEl={null}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <StyledNavLink to={routePaths.common.user.createLink(user?.id)} activeClassName="current-link" exact>
          <MenuItem onClick={toggleAnchor}>
            Мой аккаунт
          </MenuItem>
        </StyledNavLink>

        <MenuItem onClick={onLogOutClick}>
          Выход
        </MenuItem>
      </Menu>
    </>
  );
};

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };
const transformOrigin = { vertical: 'top', horizontal: 'center' };

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`;

export default memo(UserMenu);
