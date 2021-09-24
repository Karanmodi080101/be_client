import axios from 'axios';
import {
  GET_REVDB,
  GET_REVIEWERS,
  GET_REVIEWERS_ERROR,
  REVDB_ERROR
} from './constants';

//Get user profile
export const getCurrentReviewData = () => async (dispatch) => {
  try {
    const res = await axios.get('revDB/me');
    dispatch({ type: GET_REVDB, payload: res.data });
  } catch (err) {
    dispatch({
      type: REVDB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get user profile
export const getCurrentReviewDataById = (empId) => async (dispatch) => {
  try {
    const res = await axios.get(`revDB/${empId}`);
    dispatch({ type: GET_REVDB, payload: res.data });
  } catch (err) {
    dispatch({
      type: REVDB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getReviewerData = (empId) => async (dispatch) => {
  try {
    const res = await axios.get(`reviewers/${empId}`);
    dispatch({ type: GET_REVIEWERS, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_REVIEWERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
