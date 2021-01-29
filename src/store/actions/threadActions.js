import { ADD_THREAD_FAIL, ADD_THREAD_SUCCESS } from '../actions/types';

export const addThread = (threadData) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  try {
    const firestore = getFirestore();

    const { uid } = getState().firebase.auth;

    const { title, category } = threadData;

    await firestore.collection('threads').add({
      title: title,
      userID: uid,
      categories: firestore.FieldValue.arrayUnion(category),
      createdAt: new Date(),
    });

    dispatch({ type: ADD_THREAD_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_THREAD_FAIL, payload: error });
  }
};
