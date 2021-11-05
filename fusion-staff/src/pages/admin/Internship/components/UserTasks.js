import React, { useState, Fragment, useEffect } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Url from 'urls-tool';
import classnames from 'classnames';

import {
  FormControlLabel,
  Checkbox,
  TableCell,
  TableRow,
  TableHead,
  Table,
  Tooltip,
  FormControl,
  OutlinedInput,
} from '@material-ui/core';
import StyledModal from 'pages/sales/ProjectsTable/components/technologies/StyledModal';
import CreateTask from 'pages/admin/Internship/components/CreateTask';
import TasksHeader from 'pages/admin/Internship/components/TasksHeader';
import TasksContainer from 'pages/admin/Internship/components/TasksContainer';
import UserTask from 'pages/admin/Internship/components/UserTask';
import UpdateTaskDateForm from 'pages/admin/Internship/components/UpdateTaskDateForm';

import { TasksType, UserType, UsersType } from 'utils/types';
import { updateTaskStatusRequest } from 'api/studyTaskApi';
import MentorSelect from './MentorSelect';
import UserTaskModal from './UserTaskModal';
import TitleInput from './TitleInput';

const UserTasks = ({
  globalUser,
  tasks,
  deletePlanTaskJob,
  onDrop,
  handleUserTasksDropInside,
  title,
  type,
  loadPlan,
  userId,
  users,
  getTasks,
  plan,
  isStudentTasks,
  toggleTasksFilter,
  isShowAllTasks,
  userTasksIds,
  tasksSortType,
  toggleTasksSortType,
  refreshUserList,
  currentUser,
  handleChangeSearchValue
}) => {
  const [isLeave, setIsLeave] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [direction, setDirection] = useState('down');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const task = Number(Url.getParams().object.task);
    const user_task = Number(Url.getParams().object.user_task);

    if (!isNaN(task)) {
      const newTask = tasks.find(t => t.id === task);
      setSelectedTask(newTask);
      setShowTaskModal(true);
    }

    if (!isNaN(user_task)) {
      const newTask = tasks.find(t => t.id === user_task);
      setSelectedTask(newTask);
      setShowTaskModal(true);
    }
  }, [tasks]);

  const getPayload = (index) => {
    return tasks[index];
  };

  const handleDrop = async (e) => {
    const { removedIndex, addedIndex, payload } = e;

    if (type === 'STUDENT_TASKS' && removedIndex !== null && addedIndex !== null) {
      const result = [...plan.idChain];
      const newTaskJobs = [...plan.taskJobs];
      let itemToAdd = payload;
      let taskToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
        taskToAdd = newTaskJobs.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
        newTaskJobs.splice(addedIndex, 0, taskToAdd);
      }
      const newPlan = {
        ...plan,
        idChain: result
      };
      const newPlanView = {
        ...plan,
        taskJobs: newTaskJobs
      };

      return handleUserTasksDropInside(newPlan, payload.id, newPlanView);
    }

    if (type === 'STUDENT_TASKS' && removedIndex === null && addedIndex !== null) {
      if (userTasksIds.includes(payload.id)) {
        return null;
      }
      if (!isLeave && isEnter) {
        if (!plan) return onDrop(e);

        const result = [...plan.idChain];
        const newTaskJobs = [...plan.taskJobs];
        const itemToAdd = payload;
        const taskToAdd = payload;

        result.splice(addedIndex, 0, itemToAdd);
        newTaskJobs.splice(addedIndex, 0, taskToAdd);

        const newPlan = {
          ...plan,
          idChain: result
        };
        const newPlanView = {
          ...plan,
          taskJobs: newTaskJobs
        };

        return onDrop(e, newPlan, newPlanView);
      }
    }

    if (type === 'STUDENT_TASKS' && removedIndex !== null && addedIndex === null) {
      if (isLeave && !isEnter) {
        return deletePlanTaskJob(payload.plan_taskJob.id);
      }
    }
    return null;
  };

  const handleDragLeave = () => {
    setIsLeave(true);
    setIsEnter(false);
  };

  const handleDragEnter = () => {
    setIsEnter(true);
    setIsLeave(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const openDateModal = (task, type) => {
    setSelectedTask(task);
    setModalType(type);
    setShowDateModal(true);
  };

  const closeDateModal = () => {
    setShowDateModal(false);
  };

  const updateStartTaskDate = async (date, id) => {
    await updateTaskStatusRequest(id, {
      startTask: date
    });
    const newTask = {
      ...selectedTask,
      plan_taskJob: {
        ...selectedTask.plan_taskJob,
        startTask: date
      }
    };
    setSelectedTask(newTask);
    loadPlan(userId);
  };

  const updateFinishTaskDate = async (date, id) => {
    await updateTaskStatusRequest(id, {
      finishTask: date
    });
    const newTask = {
      ...selectedTask,
      plan_taskJob: {
        ...selectedTask.plan_taskJob,
        finishTask: date
      }
    };
    setSelectedTask(newTask);
    loadPlan(userId);
  };

  const resetTaskDates = async (id) => {
    await updateTaskStatusRequest(id, {
      startTask: null,
      finishTask: null
    });
    loadPlan(userId);
  };

  const handleClick = () => {
    const newDirection = direction === 'down' ? 'up' : 'down';
    toggleTasksSortType();
    setDirection(newDirection);
  };

  const selectTask = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);

    if (type === 'ALL_TASKS') {
      Url.params = {
        ...Url.params,
        task: task.id
      };
    }

    if (type === 'STUDENT_TASKS') {
      Url.params = {
        ...Url.params,
        user_task: task.id
      };
    }
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);

    const newParams = { ...Url.params };

    if (type === 'ALL_TASKS') {
      delete newParams.task;
    }

    if (type === 'STUDENT_TASKS') {
      delete newParams.user_task;
    }

    Url.params = { ...newParams };
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    handleChangeSearchValue(event.target.value);
  };

  return (
    <TasksContainer>
      <TasksHeader>
        {Boolean(type === 'STUDENT_TASKS' && users.length) && (
          <>
            <h2>
              {title}
            </h2>
            <MentorSelect
              users={users}
              refreshUserList={refreshUserList}
            />
          </>
        )}
        {(type === 'ALL_TASKS') && (
          <StyledTable>
            <StyledTableHead>
              <TableRow>
                <StyledTableCell
                  className={direction}
                  onClick={handleClick}
                >
                  {title}
                </StyledTableCell>
              </TableRow>
            </StyledTableHead>
          </StyledTable>
        )}
        {(type === 'ALL_TASKS') && (
          <>
            <button
              className='create-task__btn'
              onClick={openModal}
            >
              +
            </button>
            <div className="form__wrapper">
              <FormControl
                className='title-search'
                focused={Boolean(searchValue) || undefined}
              >
                <TitleInput
                  focused={Boolean(searchValue) || undefined}
                />
                <OutlinedInput
                  id="my-input"
                  className={classnames('title-input', { focused: searchValue })}
                  onChange={handleChange}
                  value={searchValue}
                  labelWidth={170}
                  focused={Boolean(searchValue) || undefined}
                />
              </FormControl>
              <StyledTooltip
                title='Показать все'
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isShowAllTasks}
                      onChange={toggleTasksFilter}
                      name="checkedB"
                      color="primary"
                    />
                  }
                />
              </StyledTooltip>
            </div>
          </>
        )}
      </TasksHeader>
      <Container
        dragClass="opacity-ghost"
        groupName="tasks-group"
        getChildPayload={getPayload}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        behaviour={type === 'ALL_TASKS' ? 'drop-zone' : 'move'}
      >
        {tasks.map((task, index) => (
          <Fragment key={index}>
            {type === 'STUDENT_TASKS' && (
              <Draggable key={index}>
                <UserTask
                  task={task}
                  type={type}
                  selectTask={selectTask}
                />
              </Draggable>
            )}
            {(type === 'ALL_TASKS' && currentUser !== null) && (
              <Draggable key={index}>
                <UserTask
                  task={task}
                  type={type}
                  selectTask={selectTask}
                  isIncludedInPlan={userTasksIds.includes(task.id)}
                />
              </Draggable>
            )}
            {(type === 'ALL_TASKS' && currentUser === null) && (
              <UserTask
                task={task}
                type={type}
                selectTask={selectTask}
                isIncludedInPlan={userTasksIds.includes(task.id)}
              />
            )}
          </Fragment>
        ))}
      </Container>

      <CreateTask
        show={showModal}
        onHide={closeModal}
        getTasks={getTasks}
        isStudent={isStudentTasks}
        globalUser={globalUser}
      />

      <StyledModal
        open={showDateModal}
        onClose={closeDateModal}
      >
        {modalType === 'start' && (
          <UpdateTaskDateForm
            updateTaskDate={updateStartTaskDate}
            task={selectedTask}
            closeDateModal={closeDateModal}
          />
        )}
        {modalType === 'finish' && (
          <UpdateTaskDateForm
            updateTaskDate={updateFinishTaskDate}
            task={selectedTask}
            closeDateModal={closeDateModal}
          />
        )}
      </StyledModal>

      {selectedTask && (
        <UserTaskModal
          open={showTaskModal}
          setSelectedTask={setSelectedTask}
          onClose={closeTaskModal}
          task={selectedTask}
          isStudentTasks={isStudentTasks}
          user={globalUser}
          getTasks={getTasks}
          openDateModal={openDateModal}
          resetTaskDates={resetTaskDates}
          type={type}
          tasksSortType={tasksSortType}
          loadPlan={loadPlan}
          currentUserId={userId}
        />
      )}

      <HeightSetter />
    </TasksContainer>
  );
};

const StyledTooltip = styled(Tooltip)`
  && {
    margin: 0;

    span {
      padding-top: 3px;
    }
  }
`;

const StyledTable = styled(Table)`
  padding: 0 10px;
`;

const StyledTableHead = styled(TableHead)`
  && {
    transition: 0.06s ease-in;
    padding: 0 10px;
    
    &:hover {
      background: rgba(0,0,0,0.1);
    }
  }
`;

const HeightSetter = createGlobalStyle`
  #root {
    display: flex;
    flex-direction: column;
  }
`;

const StyledTableCell = styled(TableCell)`
  && {
    padding-right: 25px;
    position: relative;
    text-align: center;
    cursor: pointer;
    user-select: none;
    min-width: 150px;
    vertical-align: middle;
    font-size: 16px;
    line-height: 19px;
  }
`;

UserTasks.propTypes = {
  globalUser: UserType,
  currentUser: UserType,
  users: UsersType,
  tasks: TasksType,
  userTasksIds: PropTypes.arrayOf(PropTypes.number),
  deletePlanTaskJob: PropTypes.func,
  onDrop: PropTypes.func,
  handleUserTasksDropInside: PropTypes.func,
  openModal: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
  loadPlan: PropTypes.func,
  userId: PropTypes.number,
  getTasks: PropTypes.func,
  isStudentTasks: PropTypes.bool,
  isShowAllTasks: PropTypes.bool,
  toggleTasksFilter: PropTypes.func,
  handleChangeSearchValue: PropTypes.func,
  toggleTasksSortType: PropTypes.func,
  refreshUserList: PropTypes.func,
  tasksSortType: PropTypes.string,
  plan: PropTypes.shape({
    idChain: PropTypes.arrayOf(PropTypes.number),
    taskJobs: PropTypes.arrayOf(
      PropTypes.shape({
        createdAt: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.number,
        plan_taskJob: PropTypes.shape({
          createdAt: PropTypes.string,
          finishTask: PropTypes.string,
          id: PropTypes.number,
          plan_id: PropTypes.number,
          startTask: PropTypes.string,
          status: PropTypes.string,
          taskJob_id: PropTypes.number,
          updatedAt: PropTypes.string,
        }),
      })
    )
  })
};

UserTasks.defaultProps = {
  tasks: [],
  deletePlanTaskJob: () => null,
  onDrop: () => null,
  isStudentTasks: true
};

export default React.memo(UserTasks);
