import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import { reviewerReport } from './reviewer-report';
import { actionPlan } from './action-plan';
import { devGoals } from './development-goals';

export default combineReducers({
  alert,
  auth,
  profile,
  reviewerReport,
  devGoals,
  actionPlan
});
