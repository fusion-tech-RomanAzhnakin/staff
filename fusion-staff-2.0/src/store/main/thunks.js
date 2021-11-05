import { createAsyncThunk } from '@reduxjs/toolkit';

import authApi from 'api/authApi';
import { updateUser } from './reducer';

export const authorize = createAsyncThunk(
  'main/authorizeUser',
  async (arg, { dispatch }) => {
    try {
      const user = await authApi.check();

      dispatch(updateUser(user));
    } catch (err) {
      dispatch(updateUser(null));
    }
  },
);
