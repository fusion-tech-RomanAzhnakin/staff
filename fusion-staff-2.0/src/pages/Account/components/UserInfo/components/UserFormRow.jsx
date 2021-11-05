import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

const UserFormRow = (props) => {
  return (
    <Grid item md={6} sm={12} xs={12}>
      {props.children}
    </Grid>
  );
};

UserFormRow.propTypes = {
  children: PropTypes.node,
};

UserFormRow.defaultProps = {
  children: null,
};

export default UserFormRow;
