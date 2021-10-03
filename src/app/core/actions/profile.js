import axios from 'axios';
import { setAlert } from './alert';

import {
  CLEAR_PROFILE,
  DIRECT_REPORTS_ERROR,
  GET_DIRECT_REPORTS,
  GET_PROFILE,
  IS_MANAGER,
  IS_NOT_MANAGER,
  PROFILE_ERROR
} from './constants';

//Get user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('profile/me');
    //console.log('res', res);
    return res.data;
    // if (res.data.employmentInformation.isManager) {
    //   dispatch({ type: IS_MANAGER });
    // } else {
    //   dispatch({ type: IS_NOT_MANAGER });
    // }
    //dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    setAlert('Error getting current profile', 'danger');
    // dispatch(setAlert('Error getting current profile', 'danger'));
    // dispatch({
    //   type: PROFILE_ERROR
    // });
  }
};

export const clearProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};

export const getProfileById = async (userId) => {
  try {
    //debugger;
    const res = await axios.get(`user/${userId}`);
    //console.log('RIP', res.data);
    return res.data;
    //dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    setAlert(`Error getting profile using id ${userId}`, 'danger');
    // dispatch(setAlert(`Error getting profile using id ${userId}`, 'danger'));
    // dispatch({
    //   type: PROFILE_ERROR
    // });
  }
};
export const getDirectReports = () => async (dispatch) => {
  try {
    const res = await axios.get('getDirectReports');
    dispatch({ type: GET_DIRECT_REPORTS, payload: res.data });
  } catch (err) {
    dispatch(setAlert('Error getting direct reports', 'danger'));
    dispatch({
      type: DIRECT_REPORTS_ERROR
    });
  }
};

export const bulkUploadProfiles = (profiles) => async (dispatch) => {};
