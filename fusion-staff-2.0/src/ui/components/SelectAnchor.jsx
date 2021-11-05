import React from 'react';

import Portal from '@material-ui/core/Portal';
import SelectWrapper from './SelectWrapper';

export const anchorId = 'react-select-anchor';

const SelectAnchor = () => {
  return (
    <Portal>
      <SelectWrapper id={anchorId} />
    </Portal>
  );
};

export default SelectAnchor;
