import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from 'routes/Auth';
import NewUser from 'routes/user/NewUser';
import User from 'routes/user/User';
import Users from 'routes/user/Users';
import Requests from 'routes/request/Requests';
import NewProfessor from 'routes/prof/NewProfessor';
import Professors from 'routes/prof/Professors';
import NewGradYear from 'routes/gradyear/NewGradYear';
import GraduatedYears from 'routes/gradyear/GraduatedYears';
import NewNotice from 'routes/notice/NewNotice';
import EditNotice from 'routes/notice/EditNotice';
import Notices from 'routes/notice/Notices';
import Header from './Header';

const SignedInRoutes = () => (
  <>
    <Header>
      <Switch>
        <Route exact path='/users/new' component={NewUser} />
        <Route exact path='/users/:id' component={User} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/requests' component={Requests} />
        <Route exact path='/profs/new' component={NewProfessor} />
        <Route exact path='/profs' component={Professors} />
        <Route exact path='/gradyears/new' component={NewGradYear} />
        <Route exact path='/gradyears' component={GraduatedYears} />
        <Route exact path='/notices/new' component={NewNotice} />
        <Route exact path='/notices/:id/edit' component={EditNotice} />
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
