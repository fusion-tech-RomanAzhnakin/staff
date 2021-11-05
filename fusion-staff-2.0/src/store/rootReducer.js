import { combineReducers } from 'redux';

import main from 'store/main';
import hrBoards from 'pages/HrBoards/store/reducer';
import enums from 'store/enums';
import erpDiagram from 'pages/ErpDiagram/store';
import userAccount from 'pages/Account/store';
import portfolioBuilder from 'pages/documents/PortfolioBuilder/store';
import projects from 'pages/Projects/store';
import staff from 'pages/Staff/store';
import articles from 'pages/Articles/store';

export const fullStore = {
  main,
  hrBoards,
  enums,
  userAccount,
  portfolioBuilder,
  projects,
  staff,
  articles,
  erpDiagram,
};

const combinedReducer = combineReducers(fullStore);

export const RESET_STORE_ACTION_TYPE = 'RESET_WHOLE_STORE';

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE_ACTION_TYPE) {
    return combinedReducer(undefined, action);
  }

  return combinedReducer(state, action);
};

export const resetStore = () => ({ type: RESET_STORE_ACTION_TYPE });

export default rootReducer;
