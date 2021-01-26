import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFireStore } from 'redux-firestore';
import firebaseConfig from '../config/firebase';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const middlewares = [thunk.withExtraArgument({ getFirebase, getFireStore })];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [
  middlewareEnhancer,
  reactReduxFirebase(firebaseConfig),
  reduxFirestore(firebaseConfig),
];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(rootReducer, composedEnhancers);

export default store;
