import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';

import themes from 'ui/styles/MaterialTheme/themes';

// eslint-disable-next-line no-underscore-dangle
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const MaterialProvider = ({ children }) => {
  const theme = useSelector(({ main }) => main.theme);

  return (
    <ThemeProvider theme={themes[theme]}>
      {children}
    </ThemeProvider>
  );
};

const connectFunction = connect(
  ({ main }) => ({
    theme: main.theme,
  }),
);

MaterialProvider.propTypes = {
  children: PropTypes.node,
};

MaterialProvider.defaultProps = {
  children: null,
};

export default connectFunction(memo(MaterialProvider));
