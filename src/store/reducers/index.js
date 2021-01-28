import { combineReducers } from 'redux';

import authReducer from './authReducer';
import threadReducer from './threadReducer';

import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
  auth: authReducer,
  thread: threadReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
