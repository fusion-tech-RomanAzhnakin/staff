import { combineReducers } from 'redux';

import loginUser from './login_user';
import toastReducer from './toastReducer';
import globalStore from '../global/reducer';
import internship from '../../pages/admin/Internship/store/reducers';
import matrix from '../../pages/Matrix/store/reducer';

const reducer = combineReducers({
  global: globalStore,
  loginUser,
  toastReducer,
  internship,
  matrix
});

export default reducer;
