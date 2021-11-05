import { createAsyncThunk } from '@reduxjs/toolkit';
import dateFnsSub from 'date-fns/sub';
import dateFnsAdd from 'date-fns/add';
import dateFnsStartOfDay from 'date-fns/startOfDay';
import dateFnsEndOfDay from 'date-fns/endOfDay';

import * as actions from './reducer';

import { toggleLoader } from '../../../store/main/reducer';
import userApi from '../../../api/userApi';
import requestsApi from '../../../api/requestsApi';
import crmTaskApi from '../../../api/crmTaskApi';
import { REQUEST_TYPES_NAMES, REQUEST_TYPE_COLORS } from '../../../utils/constants';
import { getFullName } from '../../../utils';

export const getData = createAsyncThunk(
  'diagram/getDevs',
  async (arg, { dispatch }) => {
    try {
      dispatch(toggleLoader(true));

      const { data: usersList } = await userApi.getList({
        filter: {
          status: ['active'],
        },
      });

      const usersObj = {};
      const devs = [];
      const devIds = [];

      usersList.forEach((user) => {
        if (user.isDev) {
          devs.push({
            ...user,
            fullName: getFullName(user),
          });
          devIds.push(user.id);
        }

        usersObj[user.id] = user;
      });

      const { data: requests } = await requestsApi.getList({
        filter: {
          '$user.id$[in]': devIds,
          'type[in]': ['dayOff', 'vacation', 'medical'],
          status: 'completed',
          'dateTo[gte]': dateFnsSub(new Date(), { months: 6 }),
        },
      });

      const { data: jobs } = await crmTaskApi.getList({
        filter: {
          deletedAt: null,
          archive: false,
          task_in_column: 7,
          '[and]': [
            { '[or]': devIds.map((id) => ({ 'subscription[contains]': [id] })) },
            // eslint-disable-next-line max-len
            { '[or]': [{ project_end_date: null }, { 'project_end_date[gte]': dateFnsSub(new Date(), { months: 6 }) }] },
          ],
        },
      });

      dispatch(actions.setDevs(devs));
      dispatch(actions.setRequests(formatRequestToItem(requests)));
      dispatch(actions.setJobs(formatCrmTasksToItem(jobs, usersObj)));
    } catch {
      dispatch(actions.setDevs([]));
      dispatch(actions.setRequests([]));
      dispatch(actions.setJobs([]));
    } finally {
      dispatch(toggleLoader(false));
    }
  },
);

const getTooltip = (title = '', description = '') => {
  return `${title}${(description || '').trim() ? `\n------------\n${description}` : ''}`.trim();
};

const formatRequestToItem = (requests) => {
  const itemsList = [];
  requests.forEach((request) => {
    // Time off
    if (request.dateFrom && request.type === 'dayOff') { return; }

    itemsList.push({
      id: `request--${request.id}`,
      group: request.user[0].id,
      title: REQUEST_TYPES_NAMES[request.type],
      tooltip: getTooltip(request.title, request.comment),
      backgroundColor: REQUEST_TYPE_COLORS[request.type],
      start_time: +dateFnsStartOfDay(
        request.dateFrom
          ? new Date(request.dateFrom)
          : dateFnsSub(new Date(request.dateTo), { days: 1 }), // For dayOff on full day type
      ),
      end_time: +dateFnsEndOfDay(new Date(request.dateTo)),

      type: 'request',
      request,
    });
  });

  return itemsList;
};

const formatCrmTasksToItem = (jobs, usersObj) => {
  const itemsList = [];

  jobs.forEach((job) => {
    const manager = usersObj[job.subscription.find((subscriberId) => {
      const user = usersObj[subscriberId];

      return user?.tech_role === 'projectManager';
    })];

    const jobObject = {
      id: `job--${job.id}`,
      title: job.title,
      tooltip: getTooltip(job.title, job.description),
      start_time: +dateFnsStartOfDay(
        job.project_start_date
          ? new Date(job.project_start_date)
          : dateFnsSub(new Date(), { months: 2 }),
      ),
      end_time: +dateFnsEndOfDay(
        job.project_end_date
          ? new Date(job.project_end_date)
          : dateFnsAdd(new Date(), { months: 1 }),
      ),

      type: 'job',
      job: {
        ...job,
        manager,
      },
    };

    job.subscription.forEach((userId) => {
      const user = usersObj[userId];

      if (!user || !user.isDev) { return; }

      itemsList.push({
        ...jobObject,
        id: `${jobObject.id}-${userId}`,
        group: userId,
      });
    });
  });

  return itemsList;
};
