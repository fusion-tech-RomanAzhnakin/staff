import { createSlice } from '@reduxjs/toolkit';

export const getInitialStore = () => ({
  devs: null,
  requests: null,
  jobs: null,
});

const diagramSlice = createSlice({
  name: 'erpDiagram',
  initialState: getInitialStore(),
  reducers: {
    setDevs: (store, { payload }) => ({
      ...store,
      devs: payload,
    }),
    setRequests: (store, { payload }) => ({
      ...store,
      requests: payload,
    }),
    setJobs: (store, { payload }) => ({
      ...store,
      jobs: payload,
    }),
  },
});

export const {
  setDevs,
  setRequests,
  setJobs,
} = diagramSlice.actions;

export default diagramSlice.reducer;
