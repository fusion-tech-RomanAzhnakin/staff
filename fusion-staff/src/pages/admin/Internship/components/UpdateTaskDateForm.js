import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { SingleDate } from 'ui';

const UpdateTaskDateForm = ({
  updateTaskDate,
  task,
  closeDateModal
}) => {
  const [date, setDate] = useState(new Date());

  const onDateChoose = (date) => {
    setDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTaskDate(date, task.plan_taskJob.id);
    closeDateModal();
  };

  return (
    <form style={styles} onSubmit={handleSubmit}>
      <SingleDate
        userRole={'admin'}
        onDateChoose={onDateChoose}
        selectedDate={date}
      />
      <Button type="submit">
        Изменить
      </Button>
    </form>
  );
};

const styles = {
  display: 'flex',
  flexDirection: 'column'
};

export default UpdateTaskDateForm;

UpdateTaskDateForm.propTypes = {
  updateTaskDate: PropTypes.func,
  task: PropTypes.shape({
    plan_taskJob: PropTypes.shape({
      id: PropTypes.number,
      startTask: PropTypes.string
    })
  }),
  onDrop: PropTypes.func,
  handleUserTasksDropInside: PropTypes.func,
  closeDateModal: PropTypes.func,
};
