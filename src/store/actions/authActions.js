import {
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from '../actions/types';

export const signIn = (credentials) => (
  dispatch,
  getState,
  { getFirebase },
) => {
  const firebase = getFirebase();

  const { email, password } = credentials;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({ type: SIGN_IN_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: SIGN_IN_FAIL, payload: error });
    });
};

export const signUp = (newUserData) => (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const { name, email, password } = newUserData;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      return firestore.collection('users').doc(response.user.uid).set({
        name,
      });
    })
    .then(() => {
      dispatch({ type: SIGN_UP_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: SIGN_UP_FAIL, payload: error });
    });
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: SIGN_OUT_SUCCESS });
    })
    .catch((error) => {
      // An error happened.
    });
};

export const updateProfile = (updatedUserData) => (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const { name: currentUserName } = getState().firebase.profile;
  const {
    uid: currentUserID,
    email: currentUserEmail,
  } = getState().firebase.auth;

  console.log(currentUserName, currentUserID, currentUserEmail);

  const { name, email, newPassword } = updatedUserData;

  const promises = [];

  if (name !== currentUserName) {
    promises.push(
      firestore.collection('users').doc(currentUserID).set({
        name,
      }),
    );
  }

  if (email !== currentUserEmail) {
    promises.push(firebase.auth().currentUser.updateEmail(email));
  }

  if (newPassword.length) {
    promises.push(firebase.auth().currentUser.updatePassword(newPassword));
  }

  Promise.all(promises)
    .then(() => {
      dispatch({ type: UPDATE_PROFILE_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: error });
    });
};
