import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from 'routes/Auth';
import Users from 'routes/Users';
import NewProfessor from 'routes/prof/NewProfessor';
import Professors from 'routes/prof/Professors';
import NewGradYears from 'routes/gradyears/NewGradYears';
import GraduatedYears from 'routes/gradyears/GraduatedYears';
import Notices from 'routes/Notices';
import Header from './Header';

const SignedInRoutes = () => (
  <>
    <Header>
      <Switch>
        <Route path='/users' component={Users} />
        <Route path='/profs/new' component={NewProfessor} />
        <Route path='/profs' component={Professors} />
        <Route path='/gradyears/new' component={NewGradYears} />
        <Route path='/gradyears' component={GraduatedYears} />
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
