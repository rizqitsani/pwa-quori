import {
  ADD_THREAD_FAIL,
  ADD_THREAD_SUCCESS,
  // GET_THREADS_FAIL,
  // GET_THREADS_SUCCESS,
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

// export const getThreads = () => async (
//   dispatch,
//   getState,
//   { getFirestore },
// ) => {
//   try {
//     const firestore = getFirestore();

//     const threads = [];
//     console.log('action');

//     await firestore
//       .collection('threads')
//       .orderBy('createdAt', 'desc')
//       .onSnapshot((querySnapshot) => {
//         querySnapshot.forEach(async (thread) => {
//           const user = await firestore
//             .collection('users')
//             .doc(thread.data().userID)
//             .get();

//           threads.push({
//             categories: thread.data().categories,
//             createdAt: thread.data().createdAt,
//             title: thread.data().title,
//             userName: user.data().name,
//           });
//         });

//         dispatch({ type: GET_THREADS_SUCCESS, payload: threads });
//       });
//   } catch (error) {
//     dispatch({ type: GET_THREADS_FAIL, payload: error });
//   }
// };
