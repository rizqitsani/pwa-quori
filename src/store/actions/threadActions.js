import { ADD_THREAD } from '../actions/types';

export const addThread = (data) => (dispatch, { getFirestore }) => {
  dispatch({ type: ADD_THREAD });
};
