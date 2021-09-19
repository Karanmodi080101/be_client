import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import store from '../store';
import './app.scss';
import { loadUser } from './core/actions/authentication';
import AuthGuard from './core/guards/authentication.guard';
import { setAuthToken } from './core/services/central-operations.service';
import Layout from './layout';

import Dashboard from './modules/dashboard/dashboard';
// import GettingStarted from './modules/getting-started/getting-started';
// import Resume from './modules/resume/resume';
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
              {/* <AuthGuard
                exact
                path={Pages.gettingStarted.link}
                component={GettingStarted}
              /> */}
            </Switch>
          </div>
        </section>
      </Layout>
    </Provider>
  );
};

export default App;
