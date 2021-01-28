import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ColorModeScript } from '@chakra-ui/react';

import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';

import firebase from './config/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import * as serviceWorker from './serviceWorker';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ColorModeScript />
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
