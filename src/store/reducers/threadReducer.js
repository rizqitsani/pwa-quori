import {
  ADD_THREAD_FAIL,
  ADD_THREAD_SUCCESS,
  DELETE_THREAD_FAIL,
  DELETE_THREAD_SUCCESS,
  EDIT_THREAD_FAIL,
  EDIT_THREAD_SUCCESS,
} from '../actions/types';

const initialState = {
  error: null,
};

const threadReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_THREAD_FAIL:
    case DELETE_THREAD_FAIL:
    case EDIT_THREAD_FAIL:
      return { ...state, error: payload?.message };
    case ADD_THREAD_SUCCESS:
    case DELETE_THREAD_SUCCESS:
    case EDIT_THREAD_SUCCESS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default threadReducer;
