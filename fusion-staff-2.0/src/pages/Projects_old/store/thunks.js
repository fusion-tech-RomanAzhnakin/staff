import { createAsyncThunk } from '@reduxjs/toolkit';

import projectApi from 'api/projectApi';
import { setProjects, setFilters, defaultProjectsFilters } from './reducer';

export const getProjects = createAsyncThunk(
  'projects/getProjects',
  async (payload, { dispatch }) => {
    try {
      console.log(`11111111111${projects}`);
      const { data: projects } = await projectApi.getList();
      dispatch(setProjects(projects));
    } catch (err) {
      dispatch(setProjects(null));
      dispatch(setFilters(defaultProjectsFilters));
    }
  },
);
