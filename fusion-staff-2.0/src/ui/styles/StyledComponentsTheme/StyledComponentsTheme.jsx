import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ThemeProvider } from 'styled-components';

import themes from 'ui/styles/StyledComponentsTheme/themes';

const StyledComponentsTheme = ({ children }) => {
  const theme = useSelector(({ main }) => main.theme);

  return (
    <ThemeProvider theme={themes[theme]}>
      {children}
    </ThemeProvider>
  );
};

StyledComponentsTheme.propTypes = {
  children: PropTypes.node,
};

StyledComponentsTheme.defaultProps = {
  children: null,
};

export default memo(StyledComponentsTheme);
