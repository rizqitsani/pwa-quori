import { LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

export const login = (data) => (dispatch, { getFirebase }) => {
  dispatch({ type: LOGIN_FAIL });
};

export const signup = (newUserData) => (
  dispatch,
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
