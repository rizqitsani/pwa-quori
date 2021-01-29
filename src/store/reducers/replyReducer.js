import { ADD_REPLY_FAIL, ADD_REPLY_SUCCESS } from '../actions/types';

const initialState = {
  error: null,
};

const threadReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_REPLY_FAIL:
      return { ...state, error: payload?.message };
    case ADD_REPLY_SUCCESS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default threadReducer;
