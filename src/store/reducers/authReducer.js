import {
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
} from '../actions/types';

const initialState = {
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SIGN_IN_FAIL:
    case SIGN_UP_FAIL:
      return { ...state, error: payload?.message };
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return { ...state, error: null };
    case SIGN_OUT_SUCCESS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
