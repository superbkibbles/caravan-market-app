// @ts-ignore
import { decode, sign } from 'jsonwebtoken';
import { Dispatch } from '../reducers/types';
import data from '../apis';
import { AUTH_STORE, AUTH_USER, AUTH_ERROR, LOGOUT_USER, LOGOUT_STORE } from './types';

type firstFormValues = {
  username: string;
  password: string;
}

export const firstLogin = (formValues: firstFormValues, callback: any) => async ( dispatch: Dispatch ) => {
  try {
    const res = await data.post('/login/firstLogin.php', { ...formValues });
    const decoded = decode(res.data.jwt);
    const encoded = sign({ ... decoded, password: formValues.password}, "sdivbsiubdsiub");
    localStorage.setItem("firstLogin", encoded);
    dispatch({
      type: AUTH_STORE,
      payload: decoded.data
    });
    localStorage.setItem('login-store', res.data.jwt);
    callback();
  } catch (e) {
    if (e.response) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'email or password is wrong'
      });
    } else {
      if(localStorage.getItem("firstLogin")) {
        const values = decode(localStorage.getItem("firstLogin"));
        console.log(values);
        if(values.data.UserName == formValues.username && values.password == formValues.password) {
          dispatch({
            type: AUTH_STORE,
            payload: values.data
          });
          callback();
          localStorage.setItem('login-store', sign(values , "sdivbsiubdsiub"));
        } else {
          dispatch({
            type: AUTH_ERROR,
            payload: 'email or password is wrong'
          });
        }
      }
    }
  }
};

type secondFormValues = {
  username: string;
  password: string;
  id:       string;
}

export const secondLogin = (formValues: secondFormValues, callback:any) => async ( dispatch:Dispatch ) => {
  try {
    const res = await data.post('/login/secondLogin.php',{ ...formValues });
    const decoded = decode(res.data.jwt);
    const encoded = sign({ ... decoded, password: formValues.password}, "sdivbsiubdsiub");
    localStorage.setItem("secondLogin", encoded);
    dispatch({
      type: AUTH_USER,
      payload: decoded.data
    });
    sessionStorage.setItem('login-user', res.data.jwt);
    callback();
  } catch (e) {
    if (e.response) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'email or password is wrong'
      });
    } else {
      if(localStorage.getItem("secondLogin")) {
        const values = decode(localStorage.getItem("secondLogin"));
        if(values.data.UserName == formValues.username && values.password == formValues.password) {
          dispatch({
            type: AUTH_USER,
            payload: values.data
          });
          callback();
          localStorage.setItem('login-user', sign(values , "sdivbsiubdsiub"));
        } else {
          dispatch({
            type: AUTH_ERROR,
            payload: 'email or password is wrong'
          });
        }
      }
    }
  }
};

export const logoutUser = (callback: any) => ( dispatch: Dispatch ) => {
  dispatch({
    type: LOGOUT_USER,
    payload: ''
  });
  window.sessionStorage.removeItem('login-user');
  callback();
};

export const logoutStore = (callback: any) => (dispatch: Dispatch) => {
  dispatch({
    type: LOGOUT_STORE,
    payload: ''
  });
  window.localStorage.removeItem('login-store');
  callback();
};
