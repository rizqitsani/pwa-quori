import { LOGIN_FAIL } from '../actions/types';

export const login = (data) => (dispatch, { getFirebase }) => {
  dispatch({ type: LOGIN_FAIL });
};
