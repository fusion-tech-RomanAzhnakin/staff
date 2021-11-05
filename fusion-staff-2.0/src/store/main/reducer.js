import { createSlice } from '@reduxjs/toolkit';

import storage from 'utils/storage';

export const ThemeType = { main: 'main', dark: 'dark' };

export const getInitialStore = () => ({
  user: null,
  showLoader: false,
  theme: isDarkTheme() ? ThemeType.dark : ThemeType.main,
  isSidebarOpen: false,
  pageTitle: '',
});

const isDarkTheme = () => {
  const { theme } = storage;
  if (Object.values(ThemeType).includes(theme)) {
    return theme === ThemeType.dark;
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }

  return false;
};

const mainSlice = createSlice({
  name: 'main',
  initialState: getInitialStore(),
  reducers: {
    updateUser: (store, { payload }) => ({
      ...store,
      user: payload,
    }),
    toggleLoader: (store, { payload }) => ({
      ...store,
      showLoader: typeof payload === 'boolean' ? payload : !store.showLoader,
    }),
    updateTheme: (store, { payload }) => {
      storage.theme = payload;

      return {
        ...store,
        theme: payload,
      };
    },
    toggleSidebar: (store, { payload }) => ({
      ...store,
      isSidebarOpen: typeof payload === 'boolean' ? payload : !store.isSidebarOpen,
    }),
    updatePageTitle: (store, { payload }) => ({
      ...store,
      pageTitle: payload,
    }),
  },
});

export const {
  updateUser,
  toggleLoader,
  updateTheme,
  toggleSidebar,
  updatePageTitle,
} = mainSlice.actions;

export default mainSlice.reducer;
