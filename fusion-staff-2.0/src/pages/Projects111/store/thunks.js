import { createAsyncThunk } from '@reduxjs/toolkit';

import projectApi from 'api/projectApi';
import { setProjects, setFilters, defaultProjectsFilters } from './reducer';

export const getProjects = createAsyncThunk(
  'projects/getProjects',
  async (payload, { dispatch }) => {
    try {
      const { data: projects } = await projectApi.getList(payload);
      dispatch(setProjects(projects));
    } catch (err) {
      dispatch(setProjects(null));
      dispatch(setFilters(defaultProjectsFilters));
    }
  },
);
