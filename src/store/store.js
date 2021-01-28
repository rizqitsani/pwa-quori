import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import firebase from '../config/firebase';
import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer, reduxFirestore(firebase)];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(rootReducer, composedEnhancers);

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(...middleware)),
// );

export default store;
