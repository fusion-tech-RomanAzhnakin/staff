import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { Typography, Button } from '@material-ui/core';
import CustomModal from 'ui/components/Modal';
import TaskEditForm from 'pages/admin/Internship/components/TaskEditForm';

import { UserType } from 'utils/types';
import { updateTaskStatusRequest, deleteTaskRequest, updateTaskRequest } from 'api/studyTaskApi';
import { updateAnnouncement } from 'api/announcementApi';
import { ConfirmModal } from 'ui';
import { getDayWord } from 'utils/wordHandler';
import { taskJobLevelNames, taskJobLevelOptions } from 'utils/constants';

class UserTaskModal extends Component {
  state = {};

  componentDidMount() {
    this.refreshState();
  }

  refreshState = () => {
    const { task } = this.props;
    const { hidden, visitDate } = task;
    const isHidden = hidden ? 'hidden' : 'see';
    this.setState((state) => ({
      hidden:
        state.hiddenInitial !== undefined ? state.hiddenInitial : isHidden,
      hiddenInitial:
        state.hiddenInitial === undefined ? isHidden : state.hiddenInitial,
      edit: false,
      oldTaskData: {
        title: task.title,
        description: task.description ? task.description : ''
      },
      timeLimit: task.time_limits || '',
      level: task.level
        ? taskJobLevelOptions.find(item => item.value === task.level)
        : null,
      title: task.title,
      description: task.description ? task.description : '',
      visitDate: state.visitDate
        ? state.visitDate
        : visitDate
          ? new Date(visitDate)
          : new Date()
    }));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = async () => {
    const { title, description, timeLimit, level } = this.state;
    const { user, getTasks, tasksSortType } = this.props;
    try {
      if (this.props.isStudentTasks) {
        const { data: res } = await updateTaskRequest(this.props.task.id, {
          timeLimit,
          title,
          description,
          level: level.value
        });
        this.changeRes(res);
        getTasks(tasksSortType);
      } else {
        const data = {
          title: this.state.title,
          description: this.state.description,
          author_id: user.id,
          visitDate: this.state.visitDate,
          hidden: this.state.hidden === 'hidden'
        };

        const { data: res } = await updateAnnouncement(
          this.props.task.id,
          data
        );
        this.changeRes(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  changeRes = (res) => {
    const { title, description, hidden } = res;
    this.setState({
      edit: false,
      hiddenInitial: hidden ? 'hidden' : 'see',
      oldTaskData: { title, description },
      title,
      description
    });
  };

  cancelEdit = () => {
    this.refreshState();
    const { title, description } = this.state.oldTaskData;
    this.setState({
      edit: false,
      title,
      description
    });
  };

  startJob = async () => {
    const {
      loadPlan,
      currentUserId,
      task,
      setSelectedTask
    } = this.props;
    const id = task.plan_taskJob ? task.plan_taskJob.id : null;

    await updateTaskStatusRequest(id, {
      startTask: new Date(),
    });
    const newTask = {
      ...task,
      plan_taskJob: {
        ...task.plan_taskJob,
        startTask: new Date()
      }
    };
    setSelectedTask(newTask);
    loadPlan(currentUserId);
  };

  endJob = async () => {
    const {
      loadPlan,
      currentUserId,
      task,
      setSelectedTask
    } = this.props;
    const id = task.plan_taskJob ? task.plan_taskJob.id : null;

    await updateTaskStatusRequest(id, {
      finishTask: new Date()
    });
    const newTask = {
      ...task,
      plan_taskJob: {
        ...task.plan_taskJob,
        finishTask: new Date()
      }
    };
    setSelectedTask(newTask);
    loadPlan(currentUserId);
  };

  resetTask = () => {
    const { resetTaskDates, task } = this.props;
    resetTaskDates(task.plan_taskJob.id);
    this.closeResetModal();
  };

  deleteTask = async () => {
    const { getTasks, tasksSortType, task, onClose } = this.props;
    await deleteTaskRequest(task.id);
    this.closeDeleteModal();
    onClose();
    getTasks(tasksSortType);
  };

  handleChange = (event) => {
    this.setState({ hidden: event.target.value });
  };

  onChangeDate = (visitDate) => {
    this.setState({ visitDate });
  };

  onTaskLevelChange = (level) => {
    this.setState({ level });
  };

  editInit = () => {
    this.setState({
      edit: true
    });
  };

  changeStartDate = () => {
    const { openDateModal, task } = this.props;
    openDateModal(task, 'start');
  };

  changeFinishDate = () => {
    const { openDateModal, task } = this.props;
    openDateModal(task, 'finish');
  };

  confirmResetDate = () => {
    this.setState({
      showResetModal: true
    });
  };

  confirmDeleteTask = () => {
    this.setState({
      showDeleteModal: true
    });
  };

  closeResetModal = () => {
    this.setState({
      showResetModal: false
    });
  };

  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false
    });
  };

  render() {
    const {
      task,
      open,
      onClose,
      isStudentTasks,
      type,
    } = this.props;

    const {
      edit,
      timeLimit,
      title,
      description,
      hidden,
      visitDate,
      level
    } = this.state;

    const startTask = task.plan_taskJob?.startTask;
    const finishTask = task.plan_taskJob?.finishTask;

    return (
      <StyledModal
        open={open}
        onClose={onClose}
        hideHeader={edit}
        title={title}
      >
        {edit
          ? (
            <TaskEditForm
              title={title}
              description={description}
              timeLimit={timeLimit}
              onChange={this.onChange}
              hidden={hidden}
              level={level}
              isStudent={isStudentTasks}
              changeSee={this.handleChange}
              visitDate={visitDate}
              changeTime={this.onChangeDate}
              changeLevel={this.onTaskLevelChange}
            />
          )
          : (
            <>
              <StyledDescription
                className="insertHTML"
                dangerouslySetInnerHTML={
                  { __html: description } // eslint-disable-next-line
                }
              />
              {level && (
                <StyledTaskLevelTypography>
                  Уровень: {taskJobLevelNames[level.value]}
                </StyledTaskLevelTypography>
              )}
              {timeLimit && (
                <StyledTaskDateTypography style={{ paddingLeft: '10px' }}>
                  Время на выполнение: {timeLimit} {getDayWord(timeLimit)}
                </StyledTaskDateTypography>
              )}
            </>
          )}

        {type === 'STUDENT_TASKS' &&
          <div className="task__dates" style={taskDates}>
            <StyledTaskDateTypography>
              Дата начала:
              {startTask ? (
                edit ? (
                  <DateButton
                    color="primary"
                    size='small'
                    onClick={this.changeStartDate}
                  >
                    {moment(startTask).format('ll')}
                  </DateButton>
                ) : (
                  <b> {moment(startTask).format('ll')} </b>
                )
              )
                : (
                  edit ? (
                    <DateButton
                      variant='outlined'
                      color="primary"
                      size='small'
                      onClick={this.startJob}
                    >
                      Начать
                    </DateButton>
                  ) : (
                    <b> Не начато</b>
                  )
                )}
            </StyledTaskDateTypography>
            <StyledTaskDateTypography>
              Дата завершения:
              {finishTask ? (
                edit ? (
                  <DateButton
                    color="primary"
                    size='small'
                    onClick={this.changeFinishDate}
                  >
                    {moment(finishTask).format('ll')}
                  </DateButton>
                ) : (
                  <b> {moment(finishTask).format('ll')} </b>
                )
              )
                : (
                  edit ? (
                    <DateButton
                      variant='outlined'
                      color="primary"
                      size='small'
                      onClick={this.endJob}
                      disabled={!startTask}
                    >
                      Закончить
                    </DateButton>
                  ) : (
                    <b> Не закончено</b>
                  )
                )}
            </StyledTaskDateTypography>
          </div>
        }

        <div className="modal-buttons" style={modalButtons}>
          {edit && (
            <>
              <Button className="accept-btn" onClick={this.onSubmit}>
                Сохранить
              </Button>

              {type === 'STUDENT_TASKS' && startTask &&
                <Button onClick={this.confirmResetDate}>
                  Перезапустить
                </Button>
              }

              <Button onClick={this.cancelEdit}>
                Отмена
              </Button>
            </>
          )}

          {!edit && (
            <>
              <Button onClick={this.editInit}>Редактировать</Button>
              {type === 'ALL_TASKS' && (
                <Button className="decline-btn" onClick={this.confirmDeleteTask}>
                  Удалить
                </Button>
              )}
            </>
          )}
        </div>

        <ConfirmModal
          open={this.state.showResetModal}
          onClose={this.closeResetModal}
          onAccept={this.resetTask}
          title="Вы действительно хотите перезапустить задание?"
        />
        <ConfirmModal
          open={this.state.showDeleteModal}
          onClose={this.closeDeleteModal}
          onAccept={this.deleteTask}
          title="Вы действительно хотите удалить задание?"
        />
      </StyledModal>
    );
  }
}

const StyledModal = styled(CustomModal)`
  && {
    & .modal-content-wrapper {
      min-width: 700px;
    }

    & .task__dates {
      margin-top: 40px;
    }
  }
`;

const StyledDescription = styled(Typography)`
  && {
    position: relative;
    margin-bottom: 30px;

    &::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 0;
      width: 100%;
      height: 1px;
      background: #333;
    }
  }
`;

const StyledTaskDateTypography = styled(Typography)`
  min-width: 50%;
`;

const StyledTaskLevelTypography = styled(Typography)`
  padding-left:10px;
  && {
    margin-bottom:10px;
  }
`;

const modalButtons = {
  marginTop: 30,
  display: 'flex',
  justifyContent: 'space-between'
};

const taskDates = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '0 10px 20px',
  borderBottom: '1px solid #333',
  marginBottom: 10
};

const DateButton = styled(Button)`
  && {
    margin-left: 15px;
    transition: 0.05s ease-in;

    &:hover {
      opacity: 0.8;
      background-color: rgba(232, 232, 232, 1);
    }
  }
`;

export default UserTaskModal;

UserTaskModal.propTypes = {
  open: PropTypes.bool,
  setSelectedTask: PropTypes.func,
  onClose: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.number,
    time_limits: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    plan_taskJob: PropTypes.object,
    hidden: PropTypes.any,
    visitDate: PropTypes.any,
    level: PropTypes.string,
  }),
  isStudentTasks: PropTypes.bool,
  user: UserType,
  getTasks: PropTypes.func,
  openDateModal: PropTypes.func,
  resetTaskDates: PropTypes.func,
  type: PropTypes.string,
  tasksSortType: PropTypes.string,
  loadPlan: PropTypes.func,
  currentUserId: PropTypes.number,
};
