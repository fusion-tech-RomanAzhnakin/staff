import { createAsyncThunk } from '@reduxjs/toolkit';

import Url from 'urls-tool';

import projectApi from 'api/projectApi';

import { setProjects, clearFilter } from './reducer';

export const getProjects = createAsyncThunk(
  'projects/getProjects',
  async (payload, { dispatch, getState }) => {
    try {
      const { projects } = getState();
      const filterArray = {
        search: projects.filters.search,
        technologies: projects.filters.technologies,
        user: projects.filters.user,
      };
      const preparedFilter = {};
      for (const item in filterArray) {
        if (filterArray[item] !== null || filterArray[item]?.length > 0) {
          const value = filterArray[item];
          if (Array.isArray(value)) {
            preparedFilter[item] = value.map((item) => item.id);
            continue;
          }
          preparedFilter[item] = value;
        }
      }
      const params = {
        pagination: projects.pagination,
        filter: preparedFilter,
        sort: { sortBy: projects.sortBy, sortDirection: projects.sortDirection },
      };

      Url.params = ['search', params.filter.search];
      Url.params = ['users', params.filter.user];
      Url.params = ['technologies', params.filter.technologies];
      Url.params = ['direction', params.sort.sortDirection];

      const { data: projectList } = await projectApi.getList(params);
      dispatch(setProjects(projectList));
    } catch (err) {
      dispatch(setProjects(null));
      dispatch(clearFilter());
    }
  },
);
