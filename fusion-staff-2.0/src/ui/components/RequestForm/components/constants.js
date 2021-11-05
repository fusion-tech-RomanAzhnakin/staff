import PropTypes from 'prop-types';

const valuesProps = {
  values:
    PropTypes.shape({
      type: PropTypes.objectOf(PropTypes.string),
      isAllDay: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      title: PropTypes.string,
      comment: PropTypes.string,
      startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      timeStart: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      timeEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    }),
};

export default valuesProps;
