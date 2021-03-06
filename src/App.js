import React from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';

import Routes from './routes';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
