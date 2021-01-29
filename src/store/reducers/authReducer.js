import {
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAIL,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from '../actions/types';

const initialState = {
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SIGN_IN_FAIL:
    case SIGN_OUT_FAIL:
    case SIGN_UP_FAIL:
    case UPDATE_PROFILE_FAIL:
      return { ...state, error: payload?.message };
    case SIGN_IN_SUCCESS:
    case SIGN_OUT_SUCCESS:
    case SIGN_UP_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
