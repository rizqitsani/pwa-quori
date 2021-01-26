import { combineReducers } from 'redux';

import authReducer from './authReducer';
import threadReducer from './threadReducer';

export default combineReducers({
  auth: authReducer,
  thread: threadReducer,
});
