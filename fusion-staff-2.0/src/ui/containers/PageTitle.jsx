import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import withWidth from '@material-ui/core/withWidth';

import { isMdWidth } from 'utils';

const PageTitle = (props) => {
  const title = useSelector(({ main }) => main.pageTitle);

  if (!isMdWidth(props.width)) { return null; }

  return (
    <StyledTitle>
      {title}
    </StyledTitle>
  );
};

const StyledTitle = styled.p`
  padding: 15px;
  text-transform: uppercase;
  opacity: 0.7;
`;

PageTitle.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(memo(PageTitle));
