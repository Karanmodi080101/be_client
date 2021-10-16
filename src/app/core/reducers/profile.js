import {
  GET_DIRECT_REPORTS,
  GET_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  DIRECT_REPORTS_ERROR,
  IS_MANAGER,
  IS_NOT_MANAGER
} from '../actions/constants';

const initialState = {
  profile: null,
  profiles: [],
  profileLoading: true,
  error: {},
  directReports: [],
  isManager: false
};

const Profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        profileLoading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profileLoading: true
      };
    case IS_MANAGER:
      return {
        ...state,
        isManager: true
      };
    case IS_NOT_MANAGER:
      return {
        ...state,
        isManager: false
      };
    case GET_DIRECT_REPORTS:
      return {
        ...state,
        directReports: payload,
        profileLoading: false
      };
    case PROFILE_ERROR:
    case DIRECT_REPORTS_ERROR:
      return {
        ...state,
        error: payload,
        profileLoading: false
      };
    default:
      return state;
  }
};

export default Profile;
