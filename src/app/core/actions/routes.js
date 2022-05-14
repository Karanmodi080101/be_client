import { SET_ROLE, SET_COMPANY } from './constants';

export const setRole = () => async (dispatch) => {
  dispatch({
    type: SET_ROLE,
    payload: JSON.parse(
      JSON.parse(sessionStorage.getItem('currentUser'))?.organization?.roleName
    )
  });
};

export const setCompany = () => async (dispatch) => {
  dispatch({
    type: SET_COMPANY,
    payload: JSON.parse(sessionStorage.getItem('currentUser'))?.organization
      ?.organizationName
  });
};
