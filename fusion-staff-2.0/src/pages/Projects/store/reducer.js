import { createSlice } from '@reduxjs/toolkit';
import Url from 'urls-tool';

const { params } = Url;

const getDefaultProjectsFilters = () => ({
  technologies: null,
  user: null,
  search: '',
});

const getInitialStore = () => {
  return {
    projectsList: [],
    sortBy: 'title',
    sortDirection: params.direction || 'straight',
    pagination: { page: 1, perPage: 25 },
    groupsTech: [],
    filters: {
      search: params.search || '',
      technologies: params.technologies ? params.technologies.split(',').map(Number) : null,
      user: params.users ? params.users.split(',').map(Number) : null,
    },
  };
};

const ProjectSlice = createSlice({
  name: 'projects',
  initialState: getInitialStore(),
  reducers: {
    setGroupsTech: (store, { payload }) => ({
      ...store, groupsTech: payload,
    }),
    setProjects: (store, { payload }) => ({
      ...store,
      projectsList: payload,
    }),
    updateSort: (store, { payload }) => ({
      ...store,
      sortDirection: payload.sortDirection,
    }),
    updateFilterField: (store, { payload }) => {
      return {
        ...store,
        filters: {
          ...store.filters,
          [payload.name]: payload.value,
        },
      };
    },
    updateSearch: (store, { payload }) => {
      return {
        ...store,
        filters: {
          ...store.filters,
          search: payload,
        },
      };
    },
    clearFilter: (store) => {
      return {
        ...store,
        filters: getDefaultProjectsFilters(),
      };
    },
    setFilters: (store, { payload }) => ({
      ...store,
      filters: payload,
    }),
  },
});

export const { setGroupsTech,
  setProjects,
  setFilters,
  clearFilter,
  updateFilterField,
  updateSearch,
  updateSort } = ProjectSlice.actions;

export default ProjectSlice.reducer;
