import React, { memo, useState } from 'react';
import styled from 'styled-components';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { RoleChecker } from 'utils/HOC/protector';
import StyledNavLink from 'ui/containers/Header/components/StyledNavLink';

import { routePaths } from 'utils/constants';

const CreationDropdown = () => {
  const [anchor, setAnchor] = useState(null);

  const toggleAnchor = (ev) => {
    if (anchor) {
      return setAnchor(null);
    }

    setAnchor(ev.currentTarget);
  };

  return (
    <>
      <StyledPlusIcon
        onClick={toggleAnchor}
      />

      {/* Have a React warning on open event. Try to solve later */}
      <Menu
        onClose={toggleAnchor}
        open={Boolean(anchor)}
        anchorEl={anchor}
        getContentAnchorEl={null}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        {menuItemsList.map((item, index) => (
          <RoleChecker key={index} roles={item.role}>
            <StyledNavLink to={item.to} activeClassName="current-link" exact>
              <MenuItem onClick={toggleAnchor}>
                {item.title}
              </MenuItem>
            </StyledNavLink>
          </RoleChecker>
        ))}
      </Menu>
    </>
  );
};

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };
const transformOrigin = { vertical: 'top', horizontal: 'center' };

const menuItemsList = [
  // {
  //   title: 'Добавить переработку',
  //   to: routePaths.common.createOvertime,
  //   role: 'any',
  // },
  {
    title: 'Подать заявку',
    to: routePaths.common.createRequest,
    role: 'any',
  },
  // {
  //   title: 'Создать проект',
  //   to: routePaths.sales.createProject,
  //   role: ['admin', 'sales'],
  // },
  // {
  //   title: 'Создать резюме',
  //   to: routePaths.sales.createCv,
  //   role: ['admin', 'sales'],
  // },
  {
    title: 'Создать портфолио',
    to: routePaths.sales.createPortfolio,
    role: ['admin', 'sales'],
  },
];

const StyledPlusIcon = styled(AddCircleOutlineIcon)`
  cursor: pointer;
  border-radius: 100%;
  fill: ${({ theme }) => theme.colors.navbar.text};
`;

export default memo(CreationDropdown);
