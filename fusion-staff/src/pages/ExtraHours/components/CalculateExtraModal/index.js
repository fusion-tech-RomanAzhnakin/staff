import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Modal } from 'ui';
import CalculateExtraSelect from './Components/CalculateExtraSelect';
import CalculateExtraList from './Components/CalculateExtraList';
import CalculateExtraTotal from './Components/CalculateExtraTotal';

import { Button } from '@material-ui/core';

import { updateSpinner } from 'store/global/actions';
import { getExtraHours, updateExtraHours } from 'api/extraHoursAPI';

const CalculateExtraModal = (props) => {
  const [userExtras, setUserExtras] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedItemsList, setSelectedItemsList] = useState([]);

  const dispatch = useDispatch();

  const choosenExtra = useMemo(
    () => userExtras.filter(({ id }) => selectedItemsList.includes(id)),
    [selectedItemsList, userExtras]
  );

  const getUsersExtra = useCallback(
    async (user) => {
      try {
        dispatch(updateSpinner(true));

        const { data } = await getExtraHours({
          value: { isProcessed: false },
          user_id: user.value,
        });
        const dataIds = data.rows.map((item) => item.id);

        setSelectedItemsList(dataIds);
        setUserExtras(data.rows);
      } catch (err) {
        toast.error(`Что - то пошло не так ${err.message}`);
      } finally {
        dispatch(updateSpinner(false));
      }
    },
    [dispatch]
  );

  const onUserChange = useCallback(
    (user) => {
      setUser(user);
      getUsersExtra(user);
    },
    [setUser, getUsersExtra]
  );

  const handleToggleCheckboxes = useCallback(
    (id) => {
      const currentIndex = selectedItemsList.indexOf(id);
      const newSelectedItemsId = [...selectedItemsList];

      if (currentIndex === -1) {
        newSelectedItemsId.push(id);
      } else {
        newSelectedItemsId.splice(currentIndex, 1);
      }

      setSelectedItemsList(newSelectedItemsId);
    },
    [selectedItemsList]
  );

  const onSubmit = async () => {
    try {
      dispatch(updateSpinner(true));

      await Promise.all(
        selectedItemsList.map((id) => {
          try {
            const item = userExtras.find((item) => item.id === id);
            return updateExtraHours(id, { ...item, isProcessed: true });
          } catch (err) {
            return toast.error(
              `Что - то пошло не так с ${id} переработкой: ${err.message}`
            );
          }
        })
      );
      await props.getRows();
      setSelectedItemsList([]);
      toast.success('Успешно оплачено');
      onCloseModal();
    } catch (err) {
      toast.error(`Что - то пошло не так ${err.message}`);
    } finally {
      dispatch(updateSpinner(false));
    }
  };

  const onCloseModal = () => {
    setUser(null);
    setUserExtras([]);
    props.onClose();
  };

  return (
    <Modal
      title="Посчитать переработку"
      open={props.open}
      onClose={onCloseModal}
    >
      <CalculateExtraSelect onUserChange={onUserChange} user={user} />

      <CalculateExtraList
        data={userExtras}
        handleToggleCheckboxes={handleToggleCheckboxes}
        selectedItemsList={selectedItemsList}
      />

      {user && <CalculateExtraTotal choosenExtra={choosenExtra} />}

      <StyledGrid>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disabled={!selectedItemsList.length}
        >
          Посчитать
        </Button>

        <Button
          variant="outlined"
          className="close-btn"
          onClick={onCloseModal}
        >
          Отмена
        </Button>
      </StyledGrid>
    </Modal>
  );
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 76px;
  margin-top: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .close-btn {
    color: white;
    background-color: #c4c4c4;
  }
`;

CalculateExtraModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  getRows: PropTypes.func,
};

CalculateExtraModal.defaultProps = {
  open: false,
  onClose: () => null,
  getRows: () => null,
};

export default CalculateExtraModal;
