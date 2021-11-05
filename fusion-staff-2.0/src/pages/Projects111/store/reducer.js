import { createSlice } from '@reduxjs/toolkit';

export const defaultProjectsFilters = {
  include: [
    {
      model: 'user',
      attributes: ['login'],
      as: 'user',
    },
    {
      model: 'technologies',
      attributes: ['title'],
      as: 'technologies',
    },
  ],
  pagination: {
    page: 1,
    perPage: 10,
  },
};

const getInitialStore = () => ({
  projects: {},
  filters: {
    ...defaultProjectsFilters,
  },
});

const diagramSlice = createSlice({
  name: 'projects',
  initialState: getInitialStore(),
  reducers: {
    setProjects: (store, { payload }) => ({
      ...store,
      projects: payload,
    }),
    setFilters: (store, { payload }) => ({
      ...store,
      filters: payload,
    }),
  },
});

export const { setProjects, setFilters } = diagramSlice.actions;

export default diagramSlice.reducer;
