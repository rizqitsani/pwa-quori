import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ColorModeScript } from '@chakra-ui/react';

import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ColorModeScript />
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
