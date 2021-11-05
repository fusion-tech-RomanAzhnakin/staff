import { createSlice } from '@reduxjs/toolkit';

export const getInitialStore = () => ({
  technologies: null,
  usersList: null,
});

const enumsSlice = createSlice({
  name: 'enums',
  initialState: getInitialStore(),
  reducers: {
    updateTechnologies: (store, { payload }) => ({
      ...store,
      technologies: payload,
    }),
    updateUsersList: (store, { payload }) => ({
      ...store,
      usersList: payload,
    }),
  },
});

export const {
  updateTechnologies,
  updateUsersList,
} = enumsSlice.actions;

export default enumsSlice.reducer;
