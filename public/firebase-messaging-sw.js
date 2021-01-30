const self = this;

self.importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js');
self.importScripts(
  'https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js',
);

self.firebase.initializeApp({
  apiKey: 'AIzaSyAGHiL_MGH1IOmS0bN5KLooXdf177US-fU',
  authDomain: 'quori-development.firebaseapp.comproject-id.firebaseapp.com',
  projectId: 'quori-development',
  storageBucket: 'quori-development.appspot.com',
  messagingSenderId: '444463707665',
  appId: '1:444463707665:web:f01230db009562d60163b0',
});

self.firebase.messaging();
