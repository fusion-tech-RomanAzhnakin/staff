import React from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';

const CustomSelect = (props) => {
  return (
    <TableCell>
      <FormControl fullWidth disabled={props.disabled}>
        <Select
          name={props.name}
          value={props.list[props.user[props.name]] || ''}
          onChange={(e) => props.handleChange(e, props.list, props.user.id)}
        >
          {
            Object.values(props.list).map((role) => (
              <MenuItem key={role} value={role}>{role}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </TableCell>
  );
};

CustomSelect.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  list: PropTypes.objectOf(PropTypes.string),
  handleChange: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.any),
};

CustomSelect.defaultProps = {
  name: '',
  disabled: false,
  list: {},
  handleChange: () => null,
  user: {},
};

export default CustomSelect;
