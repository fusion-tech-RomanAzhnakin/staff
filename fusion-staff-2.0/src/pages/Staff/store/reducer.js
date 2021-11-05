import { createSlice } from '@reduxjs/toolkit';

const getInitialStore = () => ({
  userList: [],
  sortBy: null,
  sortDirection: null,
  filter: {
    role: null,
    techRole: null,
    status: null,
    isDev: null,
    search: '',
  },
});

const staffSlice = createSlice({
  name: 'staff',
  initialState: getInitialStore(),
  reducers: {
    updateUserList: (store, { payload }) => ({
      ...store,
      userList: payload,
    }),
    updateSort: (store, { payload }) => ({
      ...store,
      userList: payload.usersList,
      sortBy: payload.sortBy,
      sortDirection: payload.sortDirection,
    }),
    updateFilterField: (store, { payload }) => {
      return {
        ...store,
        filter: {
          ...store.filter,
          [payload.name]: payload.value,
        },
      };
    },
    updateIsDev: (store, { payload }) => {
      return {
        ...store,
        filter: {
          ...store.filter,
          isDev: payload,
        },
      };
    },
    updateSearch: (store, { payload }) => {
      return {
        ...store,
        filter: {
          ...store.filter,
          search: payload,
        },
      };
    },
    clearFilter: (store) => {
      return {
        ...store,
        filter: getInitialStore().filter,
      };
    },
  },
});

export const {
  updateUserList,
  updateSort,
  updateIsDev,
  updateSearch,
  updateFilterField,
  clearFilter,
} = staffSlice.actions;

export default staffSlice.reducer;
