import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TableHead, TableRow } from '@material-ui/core';
import ColumnTitle from './ColumnTitle';

const TableHeader = ({ applySort }) => {
  return (
    <StyledTableHead>
      <TableRow>
        <ColumnTitle
          applySort={applySort}
          title="Стажёры"
        />
      </TableRow>
    </StyledTableHead>
  );
};

TableHeader.propTypes = {
  applySort: PropTypes.func,
};

const StyledTableHead = styled(TableHead)`
  && {
    transition: 0.06s ease-in;
    
    &:hover {
      background: rgba(0,0,0,0.1);
    }
  }
`;

export default TableHeader;
