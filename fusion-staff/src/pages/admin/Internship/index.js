import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ConfirmModal } from 'ui';
import UsersTable from 'pages/admin/Internship/components/UsersTable';
import UserTasks from 'pages/admin/Internship/components/UserTasks';
import Url from 'urls-tool';

import { UsersType, TasksType, UserType } from 'utils/types';
import { updateStudyPlanRequest, getStudyPlanRequest } from 'api/studyPlanApi';
import {
  getUsers,
  getTasks,
  getPlan,
  createPlan,
  clearPlan,
  updatePlanTaskJob,
  updatePlanView,
  updateCurrentUser
} from './store/actions';

const preparePlanData = (plan, planTaskJobId, isAdd = false) => {
  const oldChain = plan.idChain;
  const newChain = oldChain.filter((item) => item !== planTaskJobId);
  const jobsToAdd = isAdd ? planTaskJobId : [];
  const data = { oldChain, newChain, jobsToAdd };

  return data;
};

const Internship = ({
  user,
  users,
  tasks,
  plan,
  currentUser,
  getUsers,
  getTasks,
  getPlan,
  clearPlan,
  createPlan,
  updatePlanTaskJob,
  updatePlanView,
  updateCurrentUser
}) => {
  const [sortType, setSortType] = useState('ASC');
  const [tasksSortType, setTasksSortType] = useState('ASC');
  const [currentUserId, setCurrentUserId] = useState(
    user ? user.id : null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [planTaskJobId, setPlanTaskJobId] = useState(null);
  const [isShowAllTasks, setIsShowAllTasks] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getUsers(sortType);
  }, [getUsers, sortType]);

  useEffect(() => {
    getTasks(tasksSortType);
  }, [getTasks, tasksSortType]);

  useEffect(() => {
    if (users.length) {
      const student_id = Number(Url.getParams().object.student_id);
      const user = users.find(user => user.id === student_id);
      updateCurrentUser(user);
    }
  }, [users]); // eslint-disable-line react-hooks/exhaustive-deps

  const taskJobs = useMemo(() => {
    if (!plan) { return []; }
    return plan.taskJobs;
  }, [plan]);

  const userTasksIds = useMemo(() => {
    if (!taskJobs) { return []; }
    const userTasksIds = taskJobs.map((task) => task.id);
    return userTasksIds;
  }, [taskJobs]);

  const tasksFilteredByTitle = useMemo(() => {
    const newTasks = tasks.filter((task) => (
      task.title.toLowerCase().includes(searchValue.toLowerCase())
    ));
    return newTasks;
  }, [tasks, searchValue]);

  const filteredTasks = useMemo(() => {
    if (!taskJobs) { return []; }
    const newTasks = tasksFilteredByTitle.filter((task) => !userTasksIds.includes(task.id));
    return newTasks;
  }, [taskJobs, tasksFilteredByTitle, userTasksIds]);

  const applySort = (direction) => {
    const newSort = direction === 'down' ? 'ASC' : 'DESC';
    setSortType(newSort);
  };

  const loadPlan = (userId) => {
    setCurrentUserId(userId);
    getPlan(userId);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const deleteTask = () => {
    const data = preparePlanData(plan, planTaskJobId);
    updatePlanTaskJob(plan.id, data, currentUserId);

    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeletePlanTaskJob = (planTaskJobId) => {
    toggleDeleteModal();
    setPlanTaskJobId(planTaskJobId);
  };

  const handleTasksDrop = async (dropResult, newPlan, newPlanView) => {
    const { payload, addedIndex } = dropResult;
    if (!currentUserId) { return; }
    if (currentUser === null) {
      return;
    }

    if (!plan) {
      const newPlan = await createPlan(currentUserId);
      const data = preparePlanData(newPlan, payload.id, true);
      await updatePlanTaskJob(newPlan.id, data, currentUserId);
      return;
    }
    await updatePlanView(newPlanView);

    const data = preparePlanData(plan, payload.id, true);
    await updateStudyPlanRequest(plan.id, data);
    const { data: res } = await getStudyPlanRequest(currentUserId);

    const result = [...res.idChain];
    const itemToAdd = result.pop(result.length - 1);
    result.splice(addedIndex, 0, itemToAdd);

    const resultPlan = {
      ...res,
      idChain: result
    };

    const resutlData = preparePlanData(resultPlan, payload.id);
    updatePlanTaskJob(plan.id, resutlData, currentUserId);
  };

  const handleUserTasksDropInside = async (newPlan, id, newPlanView) => {
    await updatePlanView(newPlanView);

    const data = preparePlanData(newPlan, id);
    await updatePlanTaskJob(plan.id, data, currentUserId);
  };

  const toggleTasksFilter = () => {
    setIsShowAllTasks(!isShowAllTasks);
  };

  const toggleTasksSortType = () => {
    return setTasksSortType(tasksSortType === 'DESC' ? 'ASC' : 'DESC');
  };

  const handleChangeSearchValue = (value) => {
    setSearchValue(value);
  };

  const refreshUserList = () => {
    getUsers(sortType);
  };

  return (
    <>
      <Content>
        <UsersTable
          users={users}
          currentUserId={user.id}
          applySort={applySort}
          getPlan={loadPlan}
          clearPlan={clearPlan}
          currentUser={currentUser}
        />
        {Boolean(taskJobs) && (
          <UserTasks
            title="Задания стажера"
            type='STUDENT_TASKS'
            handleUserTasksDropInside={handleUserTasksDropInside}
            userTasksIds={userTasksIds}
            tasks={taskJobs}
            deletePlanTaskJob={handleDeletePlanTaskJob}
            onDrop={handleTasksDrop}
            getTasks={getTasks}
            plan={plan}
            tasksSortType={tasksSortType}
            loadPlan={loadPlan}
            userId={currentUserId}
            users={users}
            refreshUserList={refreshUserList}
          />
        )}
        {Boolean(tasks) && (
          <UserTasks
            globalUser={user}
            title="Все задания"
            type='ALL_TASKS'
            tasks={isShowAllTasks ? tasksFilteredByTitle : filteredTasks}
            isShowAllTasks={isShowAllTasks}
            userTasksIds={userTasksIds}
            getTasks={getTasks}
            currentUser={currentUser}
            onDrop={handleTasksDrop}
            toggleTasksFilter={toggleTasksFilter}
            tasksSortType={tasksSortType}
            handleChangeSearchValue={handleChangeSearchValue}
            toggleTasksSortType={toggleTasksSortType}
          />
        )}
      </Content>

      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={toggleDeleteModal}
        onAccept={deleteTask}
        title="Вы действительно хотите удалить это задание из учебного плана стажера?"
      />
    </>
  );
};

const Content = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 30px 0 15px;
  width: 90%;
  justify-content: space-between;
  flex-grow: 1;

  @media (max-width: 1300px) {
    overflow: auto;
    margin: 0;
    width: 100%;
  }
`;

Internship.propTypes = {
  user: UserType,
  users: UsersType,
  tasks: TasksType,
  currentUser: UserType,
  plan: PropTypes.shape({
    createdAt: PropTypes.string,
    id: PropTypes.number,
    idChain: PropTypes.arrayOf(PropTypes.number),
    noteForAdmin: PropTypes.string,
    taskJobs: PropTypes.arrayOf(PropTypes.shape({
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
      title: PropTypes.string,
      updatedAt: PropTypes.string,
    })),
    title: PropTypes.string,
    updatedAt: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.shape({
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string,
      login: PropTypes.string,
      user_plan: PropTypes.shape({
        createdAt: PropTypes.string,
        id: PropTypes.number,
        plan_id: PropTypes.number,
        updatedAt: PropTypes.string,
        user_id: PropTypes.number,
      }),
    }))
  }),
  getUsers: PropTypes.func,
  updateCurrentUser: PropTypes.func,
  getTasks: PropTypes.func,
  getPlan: PropTypes.func,
  clearPlan: PropTypes.func,
  createPlan: PropTypes.func,
  updatePlanTaskJob: PropTypes.func,
  updatePlanView: PropTypes.func,
};

Internship.defaultProps = {
  users: [],
  tasks: [],
  plan: {},
  getUsers: () => null,
  getTasks: () => null,
  getPlan: () => null,
  createPlan: () => null,
  updatePlanTaskJob: () => null,
};

const mapStateToProps = ({
  internship: {
    users,
    tasks,
    plan,
    currentUser
  },
  global: { user }
}) => ({
  users,
  tasks,
  plan,
  user,
  currentUser
});

export default connect(mapStateToProps,
  {
    getUsers,
    getTasks,
    getPlan,
    clearPlan,
    createPlan,
    updatePlanTaskJob,
    updateCurrentUser,
    updatePlanView
  })(Internship);
