import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ACTIONPLAN,
  SET_ACTIONPLAN,
  SET_ACTIONPLAN_ERROR,
  CLEAR_ACTIONPLAN
} from './constants';
export const clearActionPlan = () => async (dispatch) => {
  dispatch({ type: CLEAR_ACTIONPLAN });
};
export const setActionPlan = (empId, modules) => async (dispatch) => {
  const newActionPlan = {
    empId,
    modules
  };
  const body = JSON.stringify(newActionPlan);
  try {
    const res = await axios.post('actionplan', body);
    dispatch({
      type: SET_ACTIONPLAN,
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
      type: SET_ACTIONPLAN_ERROR
    });
  }
};

export const getActionPlanModules = (empId) => async (dispatch) => {
  try {
    const res = await axios.get(`actionPlan/${empId}`);
    dispatch({
      type: GET_ACTIONPLAN,
      payload: res.data
    });
  } catch (error) {
    // const errors = error.response.data.errors;
    // if (errors) {
    //   errors.array.forEach((element) => {
    //     dispatch(setAlert(error.msg, 'danger'));
    //   });
    // }
    console.log(error);
    dispatch(setAlert('Action Plan error', 'danger'));
    dispatch({
      type: SET_ACTIONPLAN_ERROR
    });
  }
};
