import React from 'react';
import PropTypes from 'prop-types';
import { ExtraType } from 'utils/types';

import CalculateExtraListItem from './CalculateExtraListItem';

const CalculateExtraList = (props) => {
  return (
    <div>
      {props.data.map((item) => (
        <CalculateExtraListItem
          item={item}
          key={item.id}
          handleToggleCheckboxes={props.handleToggleCheckboxes}
          selectedItemsList={props.selectedItemsList}
        />
      ))}
    </div>
  );
};

CalculateExtraList.propTypes = {
  data: PropTypes.arrayOf(ExtraType),
  handleToggleCheckboxes: PropTypes.func.isRequired,
  selectedItemsList: PropTypes.arrayOf(PropTypes.number),
};

CalculateExtraList.defaultProps = {
  data: [],
  selectedItemsList: [],
};

export default CalculateExtraList;
