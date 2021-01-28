import {
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
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
