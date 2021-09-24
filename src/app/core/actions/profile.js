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
    if (res.data.employmentInformation.isManager) {
      dispatch({ type: IS_MANAGER });
    } else {
      dispatch({ type: IS_NOT_MANAGER });
    }
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch(setAlert('Error getting current profile', 'danger'));
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const clearProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};

export const getProfileById = (empId) => async (dispatch) => {
  try {
    const res = await axios.get(`user/${empId}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch(setAlert(`Error getting profile using id ${empId}`, 'danger'));
    dispatch({
      type: PROFILE_ERROR
    });
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
