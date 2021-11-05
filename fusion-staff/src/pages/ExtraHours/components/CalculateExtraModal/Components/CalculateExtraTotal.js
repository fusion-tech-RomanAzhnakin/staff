import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import { ExtraType } from 'utils/types';

const CalculateExtraTotal = (props) => {
  const totalTimeInMinutes = props.choosenExtra.reduce(
    (acc, item) => moment(item?.end).diff(item?.start, 'm') + acc,
    0
  );
  const totalHours = Math.floor(totalTimeInMinutes / 60);
  const totalMinutes = totalTimeInMinutes - totalHours * 60;

  return <StyledTime>{`Всего: ${totalHours}ч ${totalMinutes}м`}</StyledTime>;
};

const StyledTime = styled.p`
  font-weight: bold;
  margin-top: 10px;
`;

CalculateExtraTotal.propTypes = {
  choosenExtra: PropTypes.arrayOf(ExtraType),
};

CalculateExtraTotal.defaultProps = {
  choosenExtra: {},
};

export default CalculateExtraTotal;
