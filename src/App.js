import React, { useEffect } from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';

import firebase, { messaging } from './config/firebase';

import Routes from './routes';

const App = () => {
  useEffect(() => {
    messaging
      .getToken({
        vapidKey:
          'BAlRIGmzXYoHo2Zdj-wVLP70D7UPAKvsfBr8emmdE4mctB2GvlfOaIBLWpL4ZPjhcKQX6n5zy9NizdYtXRYbopo',
      })
      .then((currentToken) => {
        if (currentToken) {
          console.log('id', firebase.auth().currentUser.uid);
          firebase
            .firestore()
            .collection('tokens')
            .doc(currentToken)
            .set({
              token: currentToken,
              userID: firebase.auth().currentUser.uid,
            })
            .then();
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
