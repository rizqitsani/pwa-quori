import { createStandaloneToast } from '@chakra-ui/react';

import {
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAIL,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from '../actions/types';

const toast = createStandaloneToast();

export const signIn = (credentials) => async (
  dispatch,
  getState,
  { getFirebase },
) => {
  try {
    const firebase = getFirebase();

    const { email, password } = credentials;

    await firebase.auth().signInWithEmailAndPassword(email, password);

    dispatch({ type: SIGN_IN_SUCCESS });
  } catch (error) {
    dispatch({ type: SIGN_IN_FAIL, payload: error });
    toast({
      description: error?.message,
      status: 'error',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
  }
};

export const signUp = (newUserData) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  try {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const { name, email, password } = newUserData;

    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await firestore.collection('users').doc(response.user.uid).set({
      name,
    });

    dispatch({ type: SIGN_UP_SUCCESS });
  } catch (error) {
    dispatch({ type: SIGN_UP_FAIL, payload: error });
    toast({
      description: error?.message,
      status: 'error',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
  }
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  try {
    const firebase = getFirebase();

    await firebase.auth().signOut();

    dispatch({ type: SIGN_OUT_SUCCESS });
  } catch (error) {
    dispatch({ type: SIGN_OUT_FAIL, payload: error });
    toast({
      description: error?.message,
      status: 'error',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
  }
};

export const updateProfile = (updatedUserData) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  try {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const { name: currentUserName } = getState().firebase.profile;
    const {
      uid: currentUserID,
      email: currentUserEmail,
    } = getState().firebase.auth;

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

    await Promise.all(promises);

    dispatch({ type: UPDATE_PROFILE_SUCCESS });
    toast({
      description: 'Profile updated.',
      status: 'success',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error });
    toast({
      description: error?.message,
      status: 'error',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
  }
};
