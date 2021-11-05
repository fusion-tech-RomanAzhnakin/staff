import React, { useMemo } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CustomTabelContainer from './CustomTabel.style';
import CustomPagination from '../Pagination/Pagination';

const getRowsFromData = (columns, data) => {
  if (!Array.isArray(data)) {
    return;
  }

  return data.map((row) => _.pick(row, columns.map((column) => column.dataKey)));
};

const CustomTabel = ({ columns, data, pagination, className }) => {
  const rows = useMemo(() => {
    return getRowsFromData(columns, data);
  }, [columns, data]);

  return (
    <CustomTabelContainer component={Paper} className={className}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {Array.isArray(columns) &&
              columns.map((column, index) => (
                <TableCell key={`${column}${index}`}>
                  {column.columnTitle}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, rowIndex) => (
              <TableRow key={`row${rowIndex}`}>
                {columns.map((column, cellIndex) => {
                  return (
                    <TableCell key={`row${rowIndex}${cellIndex}`}>
                      {!_.isEmpty(row[column.dataKey])
                        ? row[column.dataKey]
                        : '-'}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!_.isEmpty(pagination) && (
        <div className="custom-tabel__pagination">
          <CustomPagination pagination={pagination} />
        </div>
      )}
    </CustomTabelContainer>
  );
};

CustomTabel.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
  pagination: PropTypes.shape({
    count: PropTypes.number,
    page: PropTypes.number,
    onChange: PropTypes.func,
    totalItems: PropTypes.number,
    perPage: PropTypes.number,
  }),
  className: PropTypes.string.isRequired,
};

CustomTabel.defaultProps = {
  columns: [],
  pagination: {
    count: 1,
    page: 1,
    onChange: () => {},
  },
  data: [],
};

export default CustomTabel;
