import { ADD_THREAD_FAIL, ADD_THREAD_SUCCESS } from '../actions/types';

const initialState = {
  error: null,
};

const threadReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_THREAD_FAIL:
      return { ...state, error: payload?.message };
    case ADD_THREAD_SUCCESS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default threadReducer;
