import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { dateToString, getDateAgoWord } from 'utils';
import { updateUserByAdminRequest } from 'api/userApi';
import { FormatBirthDate } from './EditAccount';

const AdminWorkingFromform = (props) => {
  const globalUser = useSelector((store) => store.global.user);
  const [workingFrom, setWorkingFrom] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setWorkingFrom(props.user.workingFrom ? FormatBirthDate.forInput(props.user.workingFrom) : '');
  }, [props.user.workingFrom]);

  const handleSave = async () => {
    try {
      await updateUserByAdminRequest(
        props.user.id,
        {
          workingFrom: FormatBirthDate.forServer(workingFrom),
        },
      );

      setIsEditing(false);
    } catch (err) {
      toast.error(`Ошибка: ${err.message}`);
    }
  };

  const workingFromView = workingFrom ? FormatBirthDate.forServer(workingFrom) : null;

  return (
    <StyledContainer>
      {!isEditing
        ? (
          <span>
            {workingFromView ? `${timeCounter(
              workingFromView
            )} (c ${dateToString(workingFromView)})` : 'Не указано'}
          </span>
        ) : (
          <TextField
            onChange={(ev) => setWorkingFrom(ev.target.value)}
            value={workingFrom}
            InputLabelProps={{ shrink: true }}
            type="date"
          />
        )}

      {globalUser.role === 'admin' && (
        <>
          <Button
            variant="contained"
            size="small"
            color={isEditing ? 'default' : 'primary'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Отмена' : 'Редактировать'}
          </Button>

          {isEditing && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSave}
            >
              Сохранить
            </Button>
          )}
        </>
      )}
    </StyledContainer>
  );
};

const timeCounter = (date) => {
  const nowDay = moment().startOf('day');
  const startDay = moment(date)
    .startOf('day')
    .subtract(1, 'day');
  const difference = moment.duration(nowDay.diff(startDay));
  const years = getDateAgoWord(difference.years(), 'years');
  const months = getDateAgoWord(difference.months(), 'months');
  const days = getDateAgoWord(difference.days(), 'days');

  return `${years} ${months} ${days}`;
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

AdminWorkingFromform.propTypes = {
  user: PropTypes.object,
};

export default AdminWorkingFromform;
