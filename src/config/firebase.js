import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.firestore().enablePersistence({ synchronizeTabs: true });

export const messaging = firebase.messaging();

export const getToken = () =>
  messaging
    .getToken({
      vapidKey:
        'BAlRIGmzXYoHo2Zdj-wVLP70D7UPAKvsfBr8emmdE4mctB2GvlfOaIBLWpL4ZPjhcKQX6n5zy9NizdYtXRYbopo',
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log('id', firebase.auth().currentUser);
        // firebase.firestore().collection()
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });

export default firebase;
