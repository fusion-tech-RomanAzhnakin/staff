import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import valuesProps from './constants';

const TextSection = (props) => {
  return (
    <>
      <TextField
        className={props.className}
        name='title'
        value={props.values.title}
        label="Заголовок"
        onChange={props.onChange}
        onBlur={props.blurHandler}
        error={Boolean(props.touched.title && props.errors.title)}
        helperText={props.errors.title}
        fullWidth
      />

      <TextField
        className={props.className}
        name='comment'
        value={props.values.comment}
        label="Комментарий"
        onChange={props.onChange}
        onBlur={props.blurHandler}
        error={Boolean(props.touched.comment && props.errors.comment)}
        helperText={props.errors.comment}
        fullWidth
        multiline
      />
    </>
  );
};

TextSection.propTypes = {
  values: valuesProps.values.isRequired,
  onChange: PropTypes.func,
  blurHandler: PropTypes.func,
  touched: PropTypes.objectOf(PropTypes.bool),
  errors: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

TextSection.defaultProps = {
  onChange: () => null,
  blurHandler: () => null,
  errors: {},
  touched: {},
  className: '',
};

export default TextSection;
