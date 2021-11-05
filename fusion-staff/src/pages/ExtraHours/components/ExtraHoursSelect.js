import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SelectWrapper from 'ui/components/SelectWrapper';

export const paymentOptions = [
  { value: null, label: 'Все' },
  { value: false, label: 'Неоплаченные' },
  { value: true, label: 'Оплаченные' }
];

const ExtraHoursSelect = ({ onChangePayment, isProcessed }) => {
  return (
    <SelectContainer>
      <SelectWrapper>
        <Select
          options={paymentOptions}
          value={isProcessed}
          onChange={onChangePayment}
          classNamePrefix="select"
        />
      </SelectWrapper>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  @media (max-width: 566px) {
    margin-bottom: 5px;
  }
  @media (max-width: 320px) {
    width: 100%;
  }
`;

ExtraHoursSelect.propTypes = {
  onChangePayment: PropTypes.func.isRequired,
  isProcessed: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.bool
  }).isRequired
};

export default ExtraHoursSelect;
