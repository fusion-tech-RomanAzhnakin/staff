import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';

const styles = {
  root: {
    transform: 'translate(10px, 10px) scale(1)',
    '&$focused': {
      backgroundColor: 'white',
      transform: 'translate(12px, -6px) scale(0.75)',
      zIndex: 10,
      padding: '0 3px'
    },
  },
  focused: {},
};

function TitleInput(props) {
  const { classes, focused } = props;

  return (
    <InputLabel
      focused={focused}
      htmlFor="my-input"
      classes={classes}
    >
      Поиск по названию
    </InputLabel>
  );
}

TitleInput.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeSearchValue: PropTypes.func,
  focused: PropTypes.bool
};

export default withStyles(styles)(TitleInput);
