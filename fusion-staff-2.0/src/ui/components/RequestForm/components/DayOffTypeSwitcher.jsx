import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import valuesProps from './constants';

const DayOffTypeSwitcher = (props) => {
  if (props.values.type.value !== 'dayOff') {
    return null;
  }

  return (
    <RadioGroup
      value={props.values.isAllDay}
      onChange={props.radioHandler}
    >
      <FormControlLabel
        value={true}
        control={<Radio color="primary" />}
        label="Отгул на весь день"
      />

      <FormControlLabel
        value={false}
        control={<Radio color="primary" />}
        label="Отгул на вермя"
      />
    </RadioGroup>
  );
};

DayOffTypeSwitcher.propTypes = {
  values: valuesProps.values.isRequired,
  isAllDay: PropTypes.bool,
  radioHandler: PropTypes.func,
};

DayOffTypeSwitcher.defaultProps = {
  isAllDay: true,
  radioHandler: () => null,
};

export default DayOffTypeSwitcher;
