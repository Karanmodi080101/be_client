import {
  GET_REVDB,
  GET_REVIEWERS,
  GET_REVIEWERS_ERROR,
  REVDB_ERROR
} from '../actions/constants';

const initialState = {
  revDB: null,
  reviewers: [],
  revDBLoading: true,
  error: {}
};

export const reviewerReport = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REVDB:
      return {
        ...state,
        revDB: payload,
        revDBLoading: false
      };
    case REVDB_ERROR:
    case GET_REVIEWERS_ERROR:
      return {
        ...state,
        error: payload,
        revDBLoading: false
      };
    case GET_REVIEWERS:
      return {
        ...state,
        reviewers: payload,
        revDBLoading: false
      };
    default:
      return state;
  }
};
