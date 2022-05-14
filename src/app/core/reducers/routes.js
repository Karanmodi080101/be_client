import { SET_ROLE, SET_COMPANY } from '../actions/constants';

const initialState = {
  role: '',
  company: ''
};

export const routes = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ROLE:
      return {
        ...state,
        role: payload
      };
    case SET_COMPANY:
      return {
        ...state,
        company: payload
      };
    default:
      return state;
  }
};
