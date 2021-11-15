import axios from 'axios';
import { setAlert } from './alert';
import { SET_DEVGOALS_ERROR } from './constants';
//Get user profile
// export const getCurrentUserGoalList = () => async (dispatch) => {
//   try {
//     const res = await axios.get('revDB/me');
//     dispatch({ type: GET_REVDB, payload: res.data });
//   } catch (err) {
//     dispatch({
//       type: REVDB_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
// export const setDevGoals = (empId, goals) => async (dispatch) => {
//   const newDevGoals = {
//     empId,
//     goals
//   };
//   const body = JSON.stringify(newDevGoals);
//   try {
//     const res = await axios.post('devGoals', body);
//     dispatch({
//       type: SET_DEVGOALS,
//       payload: res.data
//     });
//   } catch (error) {
//     console.log(error);
//     // const errors = error.response.data.errors;
//     // if (errors) {
//     //   errors.array.forEach((element) => {
//     //     dispatch(setAlert(error.msg, 'danger'));
//     //   });
//     // }
//     dispatch({
//       type: SET_DEVGOALS_ERROR
//     });
//   }
// };

export const getDevGoals = async () => {
  try {
    const res = await axios.get(`devGoals`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const addGoal = async (devGoalObj) => {
  const body = JSON.stringify(devGoalObj);
  try {
    const res = await axios.post('devGoals', body);
    return res.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const setGoals = async (goals) => {
  const body = JSON.stringify({ goals });
  try {
    const res = await axios.post('devGoalstemp', body);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
