import { createAsyncThunk } from '@reduxjs/toolkit';

import enumsApi from 'api/enumsApi';
import userApi from 'api/userApi';
import { updateTechnologies, updateUsersList } from './reducer';

export const getAllTechnologies = createAsyncThunk(
  'enums/getAllEnums',
  async (arg, { dispatch, getState }) => {
    try {
      const { techs } = getState().enums;
      if (techs) { return; }

      const { data } = await enumsApi.getAll();

      dispatch(updateTechnologies(data));
    } catch (err) {
      dispatch(updateTechnologies(null));
    }
  },
);

export const getUsersList = createAsyncThunk(
  'enums/getUsersList',
  async (arg, { dispatch }) => {
    try {
      const data = await userApi.getList({
        filter: { status: ['active'] },
      });
      const users = {};

      data.data.forEach((user) => {
        users[user.id] = { ...user };
      });
      await dispatch(updateUsersList(users));
    } catch (err) {
      dispatch(updateUsersList(null));
    }
  },
);
