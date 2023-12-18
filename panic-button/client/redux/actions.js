// import { Action } from 'redux';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user ,
});
