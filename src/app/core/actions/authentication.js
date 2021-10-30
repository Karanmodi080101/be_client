import axios from 'axios';
import { SessionStorageKeywords } from 'src/app/shared/constants/global-constant';
import { setAuthToken } from '../services/central-operations.service';
import { setAlert } from './alert';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED
} from './constants';
//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('me');
    sessionStorage.setItem(
      SessionStorageKeywords.currentUser,
      JSON.stringify(res.data.user)
    );
    sessionStorage.setItem('googleIsSigned', false); //for google calender
    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
//Register user
export const register =
  ({
    name,
    email,
    password,
    talentPassportAccess,
    evaluationAccess,
    myDevelopmentAccess
  }) =>
  async (dispatch) => {
    const newUser = {
      name,
      email,
      password,
      talentPassportAccess,
      evaluationAccess,
      myDevelopmentAccess
    };
    const body = JSON.stringify(newUser);
    try {
      const res = await axios.post('register', body);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, 'danger'));
        });
      }
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };
//Login user
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const newLogin = {
      email,
      password
    };
    const body = JSON.stringify(newLogin);
    try {
      const res = await axios.post('login', body);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error?.message
        ? error?.message
        : error?.response?.data?.errors;
      if (typeof errors === 'object') {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, 'danger'));
        });
      } else {
        dispatch(setAlert('Invalid Credentials', 'danger'));
      }
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
//Logout / Clear user
export const logout = () => async (dispatch) => {
  try {
    const res = await axios.post('logout');
    console.log(res.data);
    dispatch({
      type: LOGOUT
    });
  } catch (e) {
    console.log(e);
  }
};
