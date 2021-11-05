import React from 'react';
import { Icon, Modal } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Task } from 'pages/admin/Internship/components/Task';

const UserTask = ({
  task,
  isIncludedInPlan,
  type,
  selectTask
}) => {
  const start = task.plan_taskJob ? task.plan_taskJob.startTask : null;
  const end = task.plan_taskJob ? task.plan_taskJob.finishTask : null;

  const handleClick = () => {
    selectTask(task);
  };

  return (
    <Task
      onDoubleClick={handleClick}
      isIncludedInPlan={isIncludedInPlan}
    >
      {type === 'STUDENT_TASKS' &&
        <>
          {(start && !end)
            ? (
              <InProgressIcon
                className={`far fa${end ? '-check' : ''}-circle`}
              />
            )
            : (
              <CompleteIcon
                className={`far fa${end ? '-check' : ''}-circle`}
              />
            )
          }
        </>
      }

      <span style={titleStyles}>
        {task.title}
      </span>

      {!isIncludedInPlan && (
        <i className="fa fa-bars move-icon" aria-hidden="true"></i>
      )}
    </Task>
  );
};

export const StyledModal = styled(Modal)`
  padding: 150px 0 0 0;
  text-align: center;

  & .modal__inner {
    padding: 30px;
    text-align: start;
    background: #fff;
    display: inline-block;
    border-radius: 10px;
    position: relative;
  }

  & .modal-dialog,
  & .modal-content,
  & .modal-body {
    width: auto;
    padding: 0;
    border: none;
    background: transparent;
    text-align: center;
    display: inline-block;
    border: none;
    box-shadow: none;
  }
`;

const InProgressIcon = styled(Icon)`
  && {
    color: #ec971f;
    margin-right: 10px;
  }
`;

const CompleteIcon = styled(Icon)`
  && {
    color: #5cb85c;
    margin-right: 10px;
  }
`;

const titleStyles = {
  flexGrow: 1
};

export default UserTask;

UserTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    level: PropTypes.string,
    plan_taskJob: PropTypes.object
  }),
  selectTask: PropTypes.func,
  isIncludedInPlan: PropTypes.bool,
  type: PropTypes.string,
};
