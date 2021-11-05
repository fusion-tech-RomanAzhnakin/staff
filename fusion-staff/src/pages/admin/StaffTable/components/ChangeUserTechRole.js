import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Popover, MenuItem, MenuList } from '@material-ui/core';

import { userTechRolesPositionOptions } from 'utils/constants';

const ChangeUserTechRole = (props) => {
  const buttonClick = (role, e) => {
    e.preventDefault();
    props.click(role);
  };

  return (
    <Popover
      open={props.show}
      onClose={props.onHide}
      anchorEl={props.target}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Paper>
        <MenuList>
          {userTechRolesPositionOptions.map((item) => {
            return (
              <MenuItem
                key={item.label}
                onClick={(e) => buttonClick(item.value, e)}
              >
                {item.label}
              </MenuItem>
            );
          })}
        </MenuList>
      </Paper>
    </Popover>
  );
};

ChangeUserTechRole.propTypes = {
  click: PropTypes.func,
  show: PropTypes.bool,
  target: PropTypes.objectOf(PropTypes.any),
  onHide: PropTypes.func,
};

ChangeUserTechRole.defaultProps = {
  target: null,
  show: false,
  click: () => null,
  onHide: () => null,
};

export default ChangeUserTechRole;
