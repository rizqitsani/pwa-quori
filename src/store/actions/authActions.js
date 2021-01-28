import { LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

export const signIn = (data) => (dispatch, getStore, { getFirebase }) => {
  dispatch({ type: LOGIN_FAIL });
};

export const signUp = (newUserData) => (
  dispatch,
  getStore,
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
      dispatch({ type: REGISTER_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: REGISTER_FAIL, payload: error });
    });
};
