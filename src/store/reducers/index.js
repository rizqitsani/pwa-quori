import { combineReducers } from 'redux';

import authReducer from './authReducer';
import replyReducer from './replyReducer';
import threadReducer from './threadReducer';

import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
  auth: authReducer,
  reply: replyReducer,
  thread: threadReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
