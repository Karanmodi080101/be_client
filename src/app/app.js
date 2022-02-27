import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef /*, useReducer*/ } from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import store from 'src/store';
//import AppContext from './context/store';
//import reducer, { initialState } from './context/reducers';
import './app.scss';
import { loadUser } from './core/actions/authentication';
import AuthGuard from './core/guards/authentication.guard';
import { setAuthToken } from './core/services/central-operations.service';
import Layout from './layout';
import ActionPlan from './modules/action-plan/action-plan';
//import BulkUpload from './modules/admin/bulk-upload/bulk-upload';
import Calender from './modules/calender/calender';
import Dashboard from './modules/dashboard/dashboard';
import DevelopmentGoals from './modules/development-goals/development-goals';
import Profile from './modules/profile/profile';
import EmployeeReviewReport from './modules/review-report/review-report';
import RightSideSkills from './modules/right-side-skills/right-side-skills';
import SkillModules from './modules/skill-modules/skill-modules';
import GrantReq from './modules/grant-request/grant-request';
import { Pages } from './shared/constants/routes';
import { EditProfile } from './core/actions/EditProfile';
import { GettingStarted } from './core/actions/GettingStarted';
import { CreateProfile } from './core/actions/CreateProfile';
import Man_Dash from './modules/Manager_Dashboard/Manager-Dashboard.jsx';
import Teams from './modules/Team/teams.jsx';
import EmployeeInfo from './modules/employee-info/EmployeeInfo';
import EvaluateGoals from './modules/evaluate-goals/EvaluateGoals';
// import { GoogleCalender } from './core/actions/GoogleCalender';
require('./core/interceptors');
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toast = useRef(null);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //read react.js documentation for explanation

  // const [state, dispatch] = useReducer(reducer, initialState);

  const getExpandedData = (data) => {
    setIsExpanded(data);
  };

  const getTogglerData = (fun) => {};

  return (
    // <AppContext.Provider value={{ state, dispatch }}>
    <Provider store={store}>
      {/* <div
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        style={{
          float: 'left',
          background: 'white',
          width: '10px',
          height: '100vh'
        }}
      ></div> */}
      <Layout getExpandedData={getExpandedData}>
        <section className='container-fluid p-0'>
          <div className={isExpanded ? 'wrapper expanded' : 'wrapper'}>
            {/* <Toast ref={toast} />
            <Button
              label='Success'
              className='p-button-success'
              onClick={showMessage(
                toast,
                AlertSeverity.Error,
                'Sumaary',
                'details'
              )}
            /> */}
            <Switch>
              <AuthGuard exact path='/ManDash' component={Man_Dash} />
              <AuthGuard exact path='/employee-info' component={EmployeeInfo} />
              <AuthGuard
                exact
                path='/evaluate-goals'
                component={EvaluateGoals}
              />
              <AuthGuard exact path={Pages.teams.link} component={Teams} />
              <AuthGuard
                exact
                path={Pages.dashboard.link}
                component={Dashboard}
              />
              <AuthGuard
                exact
                path='/emp-review-report/:id'
                component={EmployeeReviewReport}
              />
              <AuthGuard
                exact
                path={Pages.actionPlan.link}
                component={ActionPlan}
              />
              <AuthGuard
                exact
                path={Pages.developmentGoal.link}
                component={DevelopmentGoals}
              />
              <AuthGuard
                exact
                path={Pages.grantReq.link}
                component={GrantReq}
              />
              <AuthGuard
                exact
                path={Pages.calender.link}
                component={Calender}
              />
              <AuthGuard exact path={Pages.profile.link} component={Profile} />
              <AuthGuard
                exact
                path={Pages.rightSideSkills.link}
                component={RightSideSkills}
              />
              <AuthGuard
                exact
                path={Pages.EditProfile.link}
                component={EditProfile}
              />
              <AuthGuard
                exact
                path={Pages.GettingStarted.link}
                component={GettingStarted}
              />
              <AuthGuard
                exact
                path={Pages.CreateProfile.link}
                component={CreateProfile}
              />
              <AuthGuard
                exact
                path={Pages.skillModules.link}
                component={SkillModules}
              />
              {/* <AuthGuard
                exact
                path={Pages.GoogleCalender.link}
                component={GoogleCalender}
              /> */}
              {/* <AuthGuard
                exact
                path={Pages.bulkUpload.link}
                component={BulkUpload}
              /> */}
            </Switch>
          </div>
        </section>
      </Layout>
    </Provider>
    /* </AppContext.Provider> */
  );
};

export default App;
