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
import CreateOrganization from './modules/create-organization/create-organization';
import Roles from './modules/roles/roles';
import { Pages } from './shared/constants/routes';
import { EditProfile } from './core/actions/EditProfile';
import { GettingStarted } from './core/actions/GettingStarted';
import { CreateProfile } from './core/actions/CreateProfile';
import Man_Dash from './modules/Manager_Dashboard/Manager-Dashboard.jsx';
import Survey from './modules/survey/survey';
import Teams from './modules/Team/teams.jsx';
import EmployeeInfo from './modules/employee-info/EmployeeInfo';
import EvaluateGoals from './modules/evaluate-goals/EvaluateGoals';
import Permissions from './modules/Permissions/permissions.jsx';
import JoinOrganization from './modules/create-organization/JoinOrganization';
import Bestfit from './modules/ml-frontend/Bestfit';
import PersonalitySurveyForm from './modules/best-fit-employee/personality-match/personalitySurveyForm';
// import { GoogleCalender } from './core/actions/GoogleCalender';
import { connect } from 'react-redux';
require('./core/interceptors');
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toast = useRef(null);
  useEffect(() => {
    store.dispatch(loadUser());
    // console.log('orginfo', orgInfo);
  }, []); //read react.js documentation for explanation
  // useEffect(() => {
  //   console.log('orginfo', orgInfo);
  // }, [orgInfo]);

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
              <AuthGuard exact path='/survey' component={Survey} /> {/* all */}
              {/* all */}
              {/* <AuthGuard exact path='/survey' component={Survey} /> */}
              <AuthGuard
                exact
                path='/personality-match'
                component={PersonalitySurveyForm}
              />
              {/* all */}
              {/* <AuthGuard exact path='/ManDash' component={Man_Dash} /> */}
              {/* <AuthGuard exact path='/employee-info' component={EmployeeInfo} /> */}
              {/* <AuthGuard
                exact
                path='/evaluate-goals'
                component={EvaluateGoals}
              /> */}
              {/* <AuthGuard exact path={Pages.teams.link} component={Teams} /> */}
              <AuthGuard
                exact
                path={Pages.dashboard.link}
                component={Dashboard}
              />
              {/* all */}
              <AuthGuard
                exact
                path='/emp-review-report/:id'
                component={EmployeeReviewReport}
              />
              {/*all*/}
              <AuthGuard
                exact
                path={Pages.actionPlan.link}
                component={ActionPlan}
              />
              {/*all*/}
              <AuthGuard
                exact
                path={Pages.developmentGoal.link}
                component={DevelopmentGoals}
              />
              {/*all*/}
              {/* <AuthGuard
                exact
                path={Pages.grantReq.link}
                component={GrantReq}
              /> */}
              {/*Admin*/}
              {/* <AuthGuard
                exact
                path={Pages.createOrganization.link}
                component={CreateOrganization}
              /> */}
              {/*Imatmi Admin*/}
              <AuthGuard
                exact
                path={Pages.calender.link}
                component={Calender}
              />
              {/*all*/}
              <AuthGuard
                exact
                path={Pages.profile.link}
                component={Profile}
              />{' '}
              {/*all*/}
              <AuthGuard
                exact
                path={Pages.rightSideSkills.link}
                component={RightSideSkills}
              />
              {/*all*/}
              <AuthGuard
                exact
                path={Pages.EditProfile.link}
                component={EditProfile}
              />
              {/*all*/}
              <AuthGuard
                exact
                path={Pages.GettingStarted.link}
                component={GettingStarted}
              />
              {/*all*/}
              <AuthGuard
                exact
                path={Pages.CreateProfile.link}
                component={CreateProfile}
              />
              {/*all*/}
              <AuthGuard
                exact
                path={Pages.skillModules.link}
                component={SkillModules}
              />
              {/*all*/}
              <AuthGuard
                exact
                path={Pages.JoinOrganization.link}
                component={JoinOrganization}
              />
              {props?.organizationName === 'IMATMI' ? (
                props?.roleName === 'Admin' ? (
                  <>
                    <AuthGuard
                      exact
                      path={Pages.permissions.link}
                      component={Permissions}
                    />
                    <AuthGuard
                      exact
                      path={Pages.createOrganization.link}
                      component={CreateOrganization}
                    />
                    <AuthGuard
                      exact
                      path={Pages.grantReq.link}
                      component={GrantReq}
                    />
                    <AuthGuard
                      exact
                      path='/employee-info'
                      component={EmployeeInfo}
                    />
                    <AuthGuard
                      exact
                      path={Pages.roles.link}
                      component={Roles}
                    />
                  </>
                ) : null
              ) : null}
              {props?.roleName === 'Manager' ? (
                <>
                  <AuthGuard exact path='/ManDash' component={Man_Dash} />
                  <AuthGuard
                    exact
                    path='/employee-info'
                    component={EmployeeInfo}
                  />
                  <AuthGuard
                    exact
                    path='/evaluate-goals'
                    component={EvaluateGoals}
                  />
                  <AuthGuard exact path={Pages.teams.link} component={Teams} />
                  <AuthGuard
                    exact
                    path={Pages.Bestfit.link}
                    component={Bestfit}
                  />
                </>
              ) : null}
              {props?.roleName === 'Admin' ? (
                <>
                  <AuthGuard
                    exact
                    path={Pages.grantReq.link}
                    component={GrantReq}
                  />
                  <AuthGuard
                    exact
                    path='/employee-info'
                    component={EmployeeInfo}
                  />
                  <AuthGuard exact path={Pages.roles.link} component={Roles} />
                </>
              ) : null}
              {/*all*/}
              {/* <AuthGuard exact path='/ManDash' component={Man_Dash} /> */}
              {/* Manager */}
              {/* <AuthGuard exact path='/employee-info' component={EmployeeInfo} /> */}
              {/* Manager , admin*/}
              {/* <AuthGuard
                exact
                path='/evaluate-goals'
                component={EvaluateGoals}
              /> */}
              {/*manager*/}
              {/* <AuthGuard exact path={Pages.teams.link} component={Teams} /> */}
              {/*manager*/}
              {/* <AuthGuard exact path={Pages.roles.link} component={Roles} /> */}
              {/*Admin*/}
              {/* <AuthGuard
                exact
                path={Pages.permissions.link}
                component={Permissions}
              /> */}
              {/*Imatmi admin*/}
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
const mapStateToProps = (state) => ({
  roleName: state?.auth?.user?.organization?.roleName,
  organizationName: state?.auth?.user?.organization?.organizationName
});
export default connect(mapStateToProps)(App);
