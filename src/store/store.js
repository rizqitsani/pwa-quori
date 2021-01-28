import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { getFirebase } from 'react-redux-firebase';
import { getFireStore } from 'redux-firestore';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const middlewares = [thunk.withExtraArgument({ getFirebase, getFireStore })];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(rootReducer, composedEnhancers);

export default store;
