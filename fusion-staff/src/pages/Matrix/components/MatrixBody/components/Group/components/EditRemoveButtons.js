import React from 'react';
import PropTypes from 'prop-types';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { RoleCheck } from 'utils/protector';

const EditRemoveButtons = ({ onClickEdit, onClickRemove }) => {
  return (
    <RoleCheck forRole="admin">
      <EditIcon
        className="icon"
        fontSize="small"
        onClick={onClickEdit}
      />

      <DeleteIcon
        className="icon icon-delete"
        fontSize="small"
        onClick={onClickRemove}
      />
    </RoleCheck>
  );
};

EditRemoveButtons.propTypes = {
  onClickEdit: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

export default EditRemoveButtons;
