import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_REVDB,
  REVDB_ERROR,
  GET_DEVGOALS,
  SET_DEVGOALS,
  SET_DEVGOALS_ERROR
} from './constants';
//Get user profile
export const getCurrentUserGoalList = () => async (dispatch) => {
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
export const setDevGoals = (empId, goals) => async (dispatch) => {
  const newDevGoals = {
    empId,
    goals
  };
  const body = JSON.stringify(newDevGoals);
  try {
    const res = await axios.post('devGoals', body);
    dispatch({
      type: SET_DEVGOALS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    // const errors = error.response.data.errors;
    // if (errors) {
    //   errors.array.forEach((element) => {
    //     dispatch(setAlert(error.msg, 'danger'));
    //   });
    // }
    dispatch({
      type: SET_DEVGOALS_ERROR
    });
  }
};

export const getDevGoals = (empId) => async (dispatch) => {
  try {
    const res = await axios.get(`devGoals/${empId}`);
    dispatch({
      type: GET_DEVGOALS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch(setAlert('Dev Goals error', 'danger'));
    dispatch({
      type: SET_DEVGOALS_ERROR
    });
  }
};
