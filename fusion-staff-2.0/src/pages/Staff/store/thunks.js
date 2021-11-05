import { createAsyncThunk } from '@reduxjs/toolkit';

import userApi from 'api/userApi';
import { updateSort, updateUserList } from './reducer';

export const getUsersList = createAsyncThunk(
  'staff/getUserList',
  async (arg, { dispatch }) => {
    try {
      const data = await userApi.getList();

      await dispatch(updateUserList(data.data));
    } catch (err) {
      dispatch(updateUserList(null));
    }
  },
);

export const updateList = createAsyncThunk(
  'staff/updateUserList',
  async (arg, { dispatch, getState }) => {
    try {
      const { staff } = getState();
      const preparedFilter = {};
      for (const item in staff.filter) {
        if (staff.filter[item] !== null || staff.filter[item]?.length > 0) {
          const value = staff.filter[item];
          if (Array.isArray(value)) {
            preparedFilter[item] = value.map((item) => item.value);
            continue;
          }
          preparedFilter[item] = value;
        }
      }
      const data = await userApi.getList({
        sort: { sortBy: staff.sortBy, sortDirection: staff.sortDirection },
        filter: preparedFilter,
      });
      const usersData = { usersList: data.data, ...staff.filter };

      await dispatch(updateSort(usersData));
    } catch (err) {
      dispatch(updateUserList(null));
    }
  },
);
