import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from 'routes/Auth';
import NewUser from 'routes/user/NewUser';
import Users from 'routes/user/Users';
import Requests from 'routes/request/Requests';
import NewProfessor from 'routes/prof/NewProfessor';
import Professors from 'routes/prof/Professors';
import NewGradYear from 'routes/gradyear/NewGradYear';
import GraduatedYears from 'routes/gradyear/GraduatedYears';
import NewNotice from 'routes/notice/NewNotice';
import Notices from 'routes/notice/Notices';
import Header from './Header';

const SignedInRoutes = () => (
  <>
    <Header>
      <Switch>
        <Route path='/users/new' component={NewUser} />
        <Route path='/users' component={Users} />
        <Route path='/requests' component={Requests} />
        <Route path='/profs/new' component={NewProfessor} />
        <Route path='/profs' component={Professors} />
        <Route path='/gradyears/new' component={NewGradYear} />
        <Route path='/gradyears' component={GraduatedYears} />
        <Route path='/notices/new' component={NewNotice} />
        <Route path='/notices' component={Notices} />
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
