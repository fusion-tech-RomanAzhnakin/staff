import React, { useMemo } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

const CustomPagination = ({ pagination, ...rest }) => {
  const paginationProps = useMemo(() => {
    const { count, page, onChange } = pagination;
    return { count, page, onChange };
  }, [pagination]);
  const newProps = useMemo(
    () => ({
      ...paginationProps,
      ...rest,
    }),
    [paginationProps, rest],
  );

  return <Pagination {...newProps} />;
};

CustomPagination.propTypes = {
  pagination: PropTypes.shape({
    count: PropTypes.number,
    page: PropTypes.number,
    onChange: PropTypes.func,
  }),
};

CustomPagination.defaultProps = {
  pagination: {
    count: 1,
    page: 1,
    onChange: () => {},
  },
};

export default CustomPagination;
