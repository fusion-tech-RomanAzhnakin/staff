import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TableCell } from '@material-ui/core';

const ColumnTitle = ({ title, applySort }) => {
  const [direction, setDirection] = useState('down');

  const handleClick = () => {
    const newDirection = direction === 'down' ? 'up' : 'down';
    applySort(newDirection);
    setDirection(newDirection);
  };

  return (
    <StyledTableCell
      className={direction}
      onClick={handleClick}
    >
      {title}
    </StyledTableCell>
  );
};

const StyledTableCell = styled(TableCell)`
  && {
    padding-right: 25px;
    position: relative;
    text-align: center;
    cursor: pointer;
    user-select: none;
    min-width: 150px;
    vertical-align: middle;
    font-size: 16px;
    line-height: 19px;
  }
`;

ColumnTitle.propTypes = {
  title: PropTypes.string,
  applySort: PropTypes.func,
};

export default ColumnTitle;
