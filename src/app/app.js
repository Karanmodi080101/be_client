import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import store from 'src/store';
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
import { Pages } from './shared/constants/routes';
require('./core/interceptors');
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = (props) => {
  const toast = useRef(null);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //read react.js documentation for explanation

  return (
    <Provider store={store}>
      <Layout>
        <section className='container-fluid p-0'>
          <div className='wrapper'>
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
                path={Pages.calender.link}
                component={Calender}
              />
              <AuthGuard exact path={Pages.profile.link} component={Profile} />
              <AuthGuard
                exact
                path={Pages.rightSideSkills.link}
                component={RightSideSkills}
              />
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
  );
};

export default App;
