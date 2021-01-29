import {
  ADD_REPLY_FAIL,
  ADD_REPLY_SUCCESS,
  DELETE_REPLY_FAIL,
  DELETE_REPLY_SUCCESS,
  EDIT_REPLY_FAIL,
  EDIT_REPLY_SUCCESS,
} from './types';

export const addReply = (replyData) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  try {
    const firestore = getFirestore();

    const { uid } = getState().firebase.auth;

    const { reply, threadID } = replyData;

    const replyRef = firestore.collection('replies').doc(`${uid}_${threadID}`);

    const doc = await replyRef.get();

    if (doc.exists) {
      dispatch({
        type: ADD_REPLY_FAIL,
        payload: { message: `You've answered this thread before!` },
      });
      return;
    } else {
      await firestore.collection('replies').doc(`${uid}_${threadID}`).set({
        body: reply,
        createdAt: new Date(),
        threadID,
        userID: uid,
      });

      dispatch({ type: ADD_REPLY_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: ADD_REPLY_FAIL, payload: error });
  }
};

export const editReply = (editedData) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  try {
    const firestore = getFirestore();

    const { reply, replyID } = editedData;

    await firestore.collection('replies').doc(replyID).update({
      body: reply,
      createdAt: new Date(),
    });

    dispatch({ type: EDIT_REPLY_SUCCESS });
  } catch (error) {
    dispatch({ type: EDIT_REPLY_FAIL, payload: error });
  }
};

export const deleteReply = (replyID) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  try {
    const firestore = getFirestore();

    await firestore.collection('replies').doc(replyID).delete();

    dispatch({ type: DELETE_REPLY_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_REPLY_FAIL, payload: error });
  }
};
