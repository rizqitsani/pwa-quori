import {
  ADD_THREAD_FAIL,
  ADD_THREAD_SUCCESS,
  DELETE_THREAD_FAIL,
  DELETE_THREAD_SUCCESS,
} from '../actions/types';

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

export const deleteThread = (threadID) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  try {
    const firestore = getFirestore();

    await firestore.collection('threads').doc(threadID).delete();

    console.log('id', threadID);

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
  }
};
