import { LOGIN_FAIL } from '../actions/types';

const initialState = {
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FAIL:
      return state;
    default:
      return state;
  }
};

export default authReducer;
