import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { getList } from 'api/projectApi';
import { createPortfolio } from 'api/documentsApi';
import { defaultErrorMessage } from 'utils/constants';
import { toggleLoader } from 'store/main';
import {
  setProjects,
  setPortfolioUrl,
  setPageNumber,
  setIsSubmitBtnDisable,
} from './reducer';

export const getProjectsThunk = createAsyncThunk(
  'portfolio/getProjects',
  async (arg, { dispatch, getState }) => {
    try {
      dispatch(toggleLoader(true));

      const { selectedTechnologies } = getState().portfolioBuilder;
      const technologiesIdArr = selectedTechnologies.map((tech) => tech.value);

      if (!technologiesIdArr.length) {
        return dispatch(setProjects([]));
      }

      const dataObj = await getList({
        sortBy: 'id',
        sortDirection: 'straight',
        filter: {
          technologies: technologiesIdArr,
        },
      });

      const projectsOptions = dataObj.projects.map((project) => ({
        label: project.title,
        value: project.id,
        data: {
          ...project,
          technologies: project.technologies.map((tech) => ({
            label: tech.title,
            value: tech.id,
          })),
        },
      }));

      dispatch(setProjects(projectsOptions));
    } catch (err) {
      dispatch(setProjects([]));
      toast.error(defaultErrorMessage);
    } finally {
      dispatch(toggleLoader(false));
    }
  },
);

export const createPortfolioThunk = createAsyncThunk(
  'portfolio/createPortfolio',
  async (data, { dispatch }) => {
    try {
      dispatch(toggleLoader(true));
      dispatch(setIsSubmitBtnDisable(true));
      dispatch(setPortfolioUrl(''));
      dispatch(setPageNumber(1));

      const url = await createPortfolio(data);

      dispatch(setPortfolioUrl(url));
    } catch (err) {
      dispatch(setPortfolioUrl(''));
      toast.error(defaultErrorMessage);
    } finally {
      dispatch(toggleLoader(false));
      dispatch(setIsSubmitBtnDisable(false));
    }
  },
);
