import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { isDev } from 'config';
import rootReducer, { RESET_STORE_ACTION_TYPE } from './rootReducer';

const middleware = getDefaultMiddleware({
  thunk: true,
  serializableCheck: false,
  immutableCheck: false,
});
if (isDev) {
  const logger = createLogger({
    collapsed: true,
    duration: true,
  });
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  devTools: isDev,
  middleware,
  preloadedState: rootReducer(undefined, { type: RESET_STORE_ACTION_TYPE, payload: undefined }),
});

export default store;
