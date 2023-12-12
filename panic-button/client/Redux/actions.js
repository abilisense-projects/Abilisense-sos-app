// import { Action } from 'redux';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = (username) => ({
  type: LOGIN_SUCCESS,
  payload: { username },
});
