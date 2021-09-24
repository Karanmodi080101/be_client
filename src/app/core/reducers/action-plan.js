import {
  SET_ACTIONPLAN,
  GET_ACTIONPLAN,
  SET_ACTIONPLAN_ERROR,
  CLEAR_ACTIONPLAN
} from '../actions/constants';

const initialState = {
  actionPlan: {},
  actionPlanLoading: true,
  error: {}
};

export const actionPlan = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ACTIONPLAN:
      return {
        ...state,
        actionPlan: payload,
        actionPlanLoading: false
      };
    case SET_ACTIONPLAN:
      const result = {
        ...state,
        ...payload,
        actionPlanLoading: false
      };
      return result;
    case CLEAR_ACTIONPLAN:
      return {
        ...state,
        actionPlan: null,
        actionPlanLoading: true
      };
    case SET_ACTIONPLAN_ERROR:
      return {
        ...state,
        error: payload,
        actionPlanLoading: false
      };
    default:
      return state;
  }
};
