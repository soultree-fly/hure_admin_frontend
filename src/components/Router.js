import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from 'Routes/Auth';
import Users from 'Routes/Users';
import Professors from 'Routes/Professors';
import GraduatedYears from 'Routes/GraduatedYears';
import Notices from 'Routes/Notices';
import Header from './Header/HeaderPresenter';

const SignedInRoutes = () => (
  <>
    <Header>
      <Switch>
        <Route exact path='/users' component={Users} />
        <Route exact path='/profs' component={Professors} />
        <Route exact path='/gradyears' component={GraduatedYears} />
        <Route exact path='/notices' component={Notices} />
        <Redirect from='*' to='/users' />
      </Switch>
    </Header>
  </>
);

const SignedOutRoutes = () => (
  <Switch>
    <Route exact path='/' component={Auth} />
    <Redirect from='*' to='/' />
  </Switch>
);

const AppRouter = ({ isSignedIn }) => (
  <>{isSignedIn ? <SignedInRoutes /> : <SignedOutRoutes />}</>
);

AppRouter.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default AppRouter;
