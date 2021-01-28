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
const composeEnhancers = composeWithDevTools({ trace: true });
const composedEnhancers = composeEnhancers(...enhancers);

const store = createStore(rootReducer, composedEnhancers);

export default store;
