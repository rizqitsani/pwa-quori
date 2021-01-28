import { LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

const initialState = {
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOGIN_FAIL:
      return { ...state, error: payload.message };
    case REGISTER_FAIL:
      return { ...state, error: payload.message };
    case REGISTER_SUCCESS:
      return state;
    default:
      return state;
  }
};

export default authReducer;
