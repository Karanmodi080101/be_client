import {
  SET_DEVGOALS,
  GET_DEVGOALS,
  SET_DEVGOALS_ERROR
} from '../actions/constants';

const initialState = {
  devGoals: {},
  getDevGoalsLoading: true,
  setDevGoalsFlag: true,
  error: {}
};

export const devGoals = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DEVGOALS:
      return {
        ...state,
        devGoals: payload,
        devGoalsLoading: false
      };
    case SET_DEVGOALS:
      const result = {
        ...state,
        ...payload,
        setDevGoalsFlag: false
      };
      return result;
    case SET_DEVGOALS_ERROR:
      return {
        ...state,
        error: payload,
        devGoalsLoading: false
      };
    default:
      return state;
  }
};
