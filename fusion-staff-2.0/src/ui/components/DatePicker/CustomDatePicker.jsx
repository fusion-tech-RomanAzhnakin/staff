import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as locales from 'react-date-range/dist/locale';

import { Calendar, DateRangePicker } from 'react-date-range';

import { StyledWrapper } from './CustomDatePicker.style';

const CustomDatePicker = (props) => {
  const rangeValue = useMemo(() => {
    return [{
      startDate: props.startDate,
      endDate: props.endDate,
      key: 'selection',
    }];
  }, [props.startDate, props.endDate]);

  const onChange = (value) => {
    let newValue = value;

    if (props.isRange) {
      newValue = { startDate: value.selection.startDate, endDate: value.selection.endDate };
    }

    props.onChange(newValue);
  };

  if (props.isRange) {
    return (
      <StyledWrapper>
        <DateRangePicker
          className={props.className}
          showSelectionPreview={true}
          locale={locales.ru}
          moveRangeOnFirstSelection={false}
          minDate={props.minDate}
          direction="vertical"
          months={2}
          ranges={rangeValue}
          onChange={onChange}
          weekdayDisplayFormat='EEEEEE'
        />
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <Calendar
        className={props.className}
        minDate={props.minDate}
        months={1}
        date={props.value}
        onChange={onChange}
        locale={locales.ru}
        weekdayDisplayFormat='EEEEEE'
      />
    </StyledWrapper>
  );
};

CustomDatePicker.propTypes = {
  isRange: PropTypes.bool,
  onChange: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
};

CustomDatePicker.defaultProps = {
  isRange: false,
  onChange: () => null,
  startDate: new Date(),
  endDate: new Date(),
  value: new Date(),
  minDate: new Date(),
  className: '',
};

export default CustomDatePicker;
