import { ADD_THREAD } from '../actions/types';

const initialState = {
  error: null,
};

const threadReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_THREAD:
      return state;
    default:
      return state;
  }
};

export default threadReducer;
