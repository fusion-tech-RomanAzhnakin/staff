import { createAsyncThunk } from '@reduxjs/toolkit';

import userApi from 'api/userApi';
import { setUser } from './reducer';

export const getUser = createAsyncThunk(
  'userAccount/getUser',
  async (userId, { dispatch, getState }) => {
    try {
      const currentUser = getState().main.user;

      let user = currentUser;
      if (userId !== currentUser.id) {
        user = await userApi.getOne(userId);
      }

      dispatch(setUser(user));
    } catch (err) {
      dispatch(setUser(null));
    }
  },
);
