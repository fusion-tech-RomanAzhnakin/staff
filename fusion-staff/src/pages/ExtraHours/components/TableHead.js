import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import defaultThemeObject from 'ui/styles/theme/material/defaultThemeObject';

import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

const {
  breakpoints: {
    values: { md: tabletBreakpoint }
  }
} = defaultThemeObject;

class EnhancedTableHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tablet: false, show: false };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    if (window.innerWidth <= tabletBreakpoint && !this.state.tablet) {
      this.setState({ tablet: true });
    }
    if (window.innerWidth > tabletBreakpoint && this.state.tablet) {
      this.setState({ tablet: false });
    }
  };

  clickRequestSort = (property, isSortable) => {
    if (!isSortable) return;
    const { handleRequestSort, order, orderBy } = this.props;
    let newOrder = 'desc';

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }
    handleRequestSort(property, newOrder);
  };

  render() {
    const { order, orderBy, role } = this.props;
    return (
      <TableHead>
        <StyledTr>
          {this.state.tablet ? (
            <SizeLimitTd
              key={rows[0].id}
              align={rows[0].numeric ? 'right' : 'left'}
              padding={rows[0].disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === rows[0].id ? order : false}
            >
              <TableSortLabel
                active={orderBy === rows[0].id}
                direction={order}
                onClick={() => this.clickRequestSort(rows[0].id)}
              >
                Дата
              </TableSortLabel>
            </SizeLimitTd>
          ) : (
            <>
                {rows.map((row) => {
                  const hasAdminRight = !row.role || role === row.role || role === 'admin';
                  if (hasAdminRight) {
                    return (
                      <SizeLimitTd
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                        onClick={() => {
                          this.clickRequestSort(row.id, row.isSortable);
                        }}
                      >
                        <TableSortLabel
                          active={orderBy === row.id}
                          direction={order}
                          className="column__name"
                        >
                          {row.label}
                        </TableSortLabel>
                      </SizeLimitTd>
                    );
                  }
                  return null;
                })}
            </>
          )}
        </StyledTr>
      </TableHead>
    );
  }
}

const rows = [
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Автор',
    role: 'admin',
    isSortable: true
  }, {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Дата',
    role: 'user',
    isSortable: true
  }, {
    id: 'end',
    numeric: false,
    disablePadding: false,
    label: 'Время',
    role: 'user',
    isSortable: true
  }, {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Описание',
    role: 'user',
    isSortable: true
  }, {
    id: 'isProcessed',
    numeric: false,
    disablePadding: false,
    label: 'Выплачено',
    role: 'admin',
    isSortable: true
  }, {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: '',
    role: 'user',
    isSortable: false
  }
];

const StyledTr = styled(TableRow)`
  th:not(:last-of-type):hover {
    color: rgba(0, 0, 0, 0.87);
  }
  th:nth-child(5) {
    text-align: center;
    span {
      padding-left: 20px;
    }
  }
`;

const SizeLimitTd = styled(TableCell)`
  max-width: 10px;
  word-wrap: break-word;
  padding-right: 25px;
  position: relative;
  text-align: center;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  line-height: 19px;
  && {
    text-align: left;
    padding: 0 2px;
    padding-left: 23px;
    font-size: 16px;
    background: #e5e5e5;
    border: none;
  }

  a {
    color: black;
  }
  .column__name {
    font-family: Montserrat;
    font-size: 14px;
  }
`;

EnhancedTableHead.propTypes = {
  handleRequestSort: PropTypes.func,
  role: PropTypes.string,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

EnhancedTableHead.defaultProps = {
  handleRequestSort: () => null,
  role: 'user'
};

export default EnhancedTableHead;
