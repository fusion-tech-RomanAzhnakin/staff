import { createSlice } from '@reduxjs/toolkit';
import Url from 'urls-tool';

const params = Url.getParams().object;
const TAB_PARAMS_NAME = 'tab';
export const TAB_OPTIONS = ['info', 'settings', 'myRequests'];

const initialTab = TAB_OPTIONS.findIndex((i) => i === params[TAB_PARAMS_NAME]);

const getInitialStore = () => ({
  user: null,
  tab: initialTab !== -1 ? initialTab : 0,
});

const diagramSlice = createSlice({
  name: 'userAccount',
  initialState: getInitialStore(),
  reducers: {
    setUser: (store, { payload }) => ({
      ...store,
      user: payload,
    }),
    setTab: (store, { payload }) => {
      Url.params = [TAB_PARAMS_NAME, TAB_OPTIONS[payload]];

      return {
        ...store,
        tab: payload,
      };
    },
  },
});

export const {
  setUser,
  setTab,
} = diagramSlice.actions;

export default diagramSlice.reducer;
