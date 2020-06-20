import axios from 'axios';
import { setAlert } from './alert';
import history from '../utils/history'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

import { setLocalStorage, clearLocalStorage } from '../utils/storageUtil'

const url = 'http://localhost:8080/v1/authenticate';

// Login User
export const loginAction = (userName, password) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    console.log("THE REQ IS ::: " + JSON.stringify({ userName, password }))
    const res = await axios.post(url, { userName, password }, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    setLocalStorage('token', res.data.data.token)
    setLocalStorage('user-permission', res.data.data.permissions)
    setLocalStorage('userName', res.data.data.userName)
    history.push('/admin')

    // dispatch(push('/dashboard'))
  }
  catch (err) {
    console.log('ERROR IS ::: ' + JSON.stringify(err));
    const errors = ["LOGIN FAILED MAN"];

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: { msg: err, status: err }
    });
  }
}

export const logout = () => dispatch => {
  console.log('INSIDE LOGOUT OF AUTH ACTION')
  dispatch({ type: LOGOUT })
  history.push('/')
}