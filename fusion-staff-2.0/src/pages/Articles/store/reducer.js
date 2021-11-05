import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

const defaultArticlesFilters = () => {
  return {
    title: '',
    tags: [],
    users: [],
  };
};

const getInitialStore = () => ({
  filteredArticles: null,
  articles: null,
  tags: null,
  filters: defaultArticlesFilters(),
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: getInitialStore(),
  reducers: {
    setArticles: (store, { payload }) => ({
      ...store,
      articles: payload,
    }),
    setTags: (store, { payload }) => ({
      ...store,
      tags: payload,
    }),
    setFilters: (store, { payload }) => ({
      ...store,
      filters: {
        ...store.filters,
        ...payload,
      },
    }),
    setFilteredArticles: (store, { payload }) => ({
      ...store,
      filteredArticles: payload,
    }),
    clearFilters: (store) => ({
      ...store,
      filters: defaultArticlesFilters(),
    }),
  },
});

export const {
  setArticles,
  setFilters,
  setFilteredArticles,
  clearFilters,
  setTags,
  changeUpdatingStatus,
} = articlesSlice.actions;

export default articlesSlice.reducer;
