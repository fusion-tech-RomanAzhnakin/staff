import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';

import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import valuesProps from './constants';

const CustomTimePickers = (props) => {
  const isShowPicker = useMemo(
    () => (!props.values.isAllDay && props.values.type.value === 'dayOff'),
    [props.values.type, props.values.isAllDay],
  );

  const timeFromHandler = (date) => {
    props.timeHandler({
      target: { value: date, name: 'timeStart' },
    });
  };

  const timeToHandler = (date) => {
    props.timeHandler({
      target: { value: date, name: 'timeEnd' },
    });
  };

  if (!isShowPicker) {
    return null;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        className={props.className}
        ampm={false}
        name='timeStart'
        value={props.values.timeStart}
        onChange={timeFromHandler}
        onBlur={props.blurHandler}
        error={Boolean(props.touched.timeStart && props.errors.timeStart)}
        helperText={props.errors.timeStart}
        fullWidth
        autoOk
      />

      <KeyboardTimePicker
        className={props.className}
        ampm={false}
        name='timeEnd'
        value={props.values.timeEnd}
        onChange={timeToHandler}
        onBlur={props.blurHandler}
        error={Boolean(props.touched.timeEnd && props.errors.timeEnd)}
        helperText={props.errors.timeEnd}
        fullWidth
        autoOk
      />
    </MuiPickersUtilsProvider>
  );
};

CustomTimePickers.propTypes = {
  values: valuesProps.values.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  touched: PropTypes.objectOf(PropTypes.bool),
  timeHandler: PropTypes.func,
  blurHandler: PropTypes.func,
  className: PropTypes.string,
};

CustomTimePickers.defaultProps = {
  errors: {},
  touched: {},
  timeHandler: () => null,
  blurHandler: () => null,
  className: '',
};

export default CustomTimePickers;
