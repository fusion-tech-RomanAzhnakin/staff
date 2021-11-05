import { createSlice } from '@reduxjs/toolkit';

const getInitialStore = () => ({
  mainTitle: '',
  technologiesOptions: [],
  selectedTechnologies: [],
  projects: [],
  selectedProjects: [],
  pdf: {
    portfolioUrl: '',
    pageNumber: 1,
    totalPages: 1,
  },
  isProjectsEditorOpen: false,
  isSubmitBtnDisable: false,
});

const diagramSlice = createSlice({
  name: 'portfolioBuilder',
  initialState: getInitialStore(),
  reducers: {
    reset: (store) => ({
      ...getInitialStore(),
      technologiesOptions: store.technologiesOptions,
    }),
    setMainTitle: (store, { payload }) => ({
      ...store,
      mainTitle: payload,
    }),
    setTechnologiesOptions: (store, { payload }) => ({
      ...store,
      technologiesOptions: payload,
    }),
    setSelectedTechnologies: (store, { payload }) => ({
      ...store,
      selectedTechnologies: payload,
    }),
    setProjects: (store, { payload }) => ({
      ...store,
      projects: payload,
    }),
    setSelectedProjects: (store, { payload }) => ({
      ...store,
      selectedProjects: payload,
    }),
    setPortfolioUrl: (store, { payload }) => ({
      ...store,
      pdf: {
        ...store.pdf,
        portfolioUrl: payload,
      },
    }),
    setPageNumber: (store, { payload }) => ({
      ...store,
      pdf: {
        ...store.pdf,
        pageNumber: payload,
      },
    }),
    setTotalPages: (store, { payload }) => ({
      ...store,
      pdf: {
        ...store.pdf,
        totalPages: payload,
      },
    }),
    setIsProjectsEditorOpen: (store, { payload }) => ({
      ...store,
      isProjectsEditorOpen: payload,
    }),
    setIsSubmitBtnDisable: (store, { payload }) => ({
      ...store,
      isSubmitBtnDisable: payload,
    }),
  },
});

export const {
  reset,
  setMainTitle,
  setTechnologiesOptions,
  setSelectedTechnologies,
  setProjects,
  setSelectedProjects,
  setPortfolioUrl,
  setPageNumber,
  setTotalPages,
  setIsProjectsEditorOpen,
  setIsSubmitBtnDisable,
} = diagramSlice.actions;

export default diagramSlice.reducer;
