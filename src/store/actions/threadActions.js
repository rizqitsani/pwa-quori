import { createStandaloneToast } from '@chakra-ui/react';

import {
  ADD_THREAD_FAIL,
  ADD_THREAD_SUCCESS,
  DELETE_THREAD_FAIL,
  DELETE_THREAD_SUCCESS,
  EDIT_THREAD_FAIL,
  EDIT_THREAD_SUCCESS,
} from '../actions/types';

const toast = createStandaloneToast();

export const addThread = (threadData) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  try {
    const firestore = getFirestore();

    const { uid } = getState().firebase.auth;

    const { title } = threadData;

    let { category } = threadData;
    if (category === '') category = 'Other';

    await firestore.collection('threads').add({
      title: title,
      userID: uid,
      categories: firestore.FieldValue.arrayUnion(category),
      createdAt: new Date(),
    });

    dispatch({ type: ADD_THREAD_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_THREAD_FAIL, payload: error });
    toast({
      description: error?.message,
      status: 'error',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
  }
};

export const editThread = (editedData) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  try {
    const firestore = getFirestore();

    const { uid } = getState().firebase.auth;

    const { threadID, title } = editedData;

    let { category } = editedData;
    if (category === '') category = 'Other';

    await firestore
      .collection('threads')
      .doc(threadID)
      .set({
        categories: firestore.FieldValue.arrayUnion(category),
        createdAt: new Date(),
        title,
        userID: uid,
      });

    const deletedReplies = firestore
      .collection('replies')
      .where('threadID', '==', threadID);

    const snapShots = await deletedReplies.get();
    snapShots.forEach((doc) => {
      doc.ref.delete();
    });

    dispatch({ type: EDIT_THREAD_SUCCESS });
  } catch (error) {
    dispatch({ type: EDIT_THREAD_FAIL, payload: error });
    toast({
      description: error?.message,
      status: 'error',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
  }
};

export const deleteThread = (threadID) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  try {
    const firestore = getFirestore();

    await firestore.collection('threads').doc(threadID).delete();

    const deletedReplies = firestore
      .collection('replies')
      .where('threadID', '==', threadID);

    const snapShots = await deletedReplies.get();
    snapShots.forEach((doc) => {
      doc.ref.delete();
    });

    dispatch({ type: DELETE_THREAD_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_THREAD_FAIL, payload: error });
    toast({
      description: error?.message,
      status: 'error',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
  }
};
