import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { SelectWrapper } from 'ui';

import { getAllUsersRequest } from 'api/userApi';
import { formatUserToSelect } from 'utils';

const CalculateExtraSelect = (props) => {
  const [usersList, setUsersList] = useState([]);

  const getAllUsers = useCallback(async () => {
    try {
      const filter = { notRole: 'student', status: 'active' };
      const res = await getAllUsersRequest(null, filter);
      const formatUsersList = res.data.map(formatUserToSelect);

      setUsersList(formatUsersList);
    } catch (err) {
      toast.error(`Что - то пошло не так ${err.message}`);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <SelectWrapper>
      <Select
        classNamePrefix="select"
        placeholder="Выберите сотрудника"
        value={props.user}
        options={usersList}
        onChange={props.onUserChange}
      />
    </SelectWrapper>
  );
};

CalculateExtraSelect.propTypes = {
  user: PropTypes.object,
  onUserChange: PropTypes.func,
};

CalculateExtraSelect.defaultProps = {
  user: {},
  onUserChange: () => null,
};

export default CalculateExtraSelect;
