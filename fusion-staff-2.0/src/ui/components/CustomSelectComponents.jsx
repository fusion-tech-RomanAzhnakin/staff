import { components } from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';

import PropTypes from 'prop-types';

export const CustomStyles = {
  valueContainer: (provided) => ({
    ...provided,
    overflow: 'visible',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'white',
    position: 'absolute',
    top: state.hasValue || state.selectProps.inputValue ? -15 : '50%',
    transition: 'top 0.1s, font-size 0.1s',
    fontSize: (state.hasValue || state.selectProps.inputValue) && 13,
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 99,
  }),
};

const CustomCheckbox = withStyles({
  root: {
    color: 'white',
    '&$checked': {
      color: '#B163FF',
    },
  },
  checked: {},
})((props) => (<Checkbox color="default" {...props} />));

export const Option = (props) => {
  return (
    <components.Option {...props}>
      <FormControlLabel
        control={<CustomCheckbox checked={props.isSelected} />}
        label={props.label}
      />
    </components.Option>
  );
};

const { ValueContainer, Placeholder } = components;

export const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) => (
        (child && child.type !== Placeholder)
          ? child
          : null
      ))}
    </ValueContainer>
  );
};

CustomValueContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  isFocused: PropTypes.bool,
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

CustomValueContainer.defaultProps = {
  isFocused: false,
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
Option.defaultProps = {
  isSelected: false,
};
