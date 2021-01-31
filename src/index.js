import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ColorModeScript } from '@chakra-ui/react';

import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';

import firebase from './config/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import theme from './theme';

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
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
