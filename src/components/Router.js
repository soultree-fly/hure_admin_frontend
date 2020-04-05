import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from 'routes/Auth';
import NewUser from 'routes/user/NewUser';
import User from 'routes/user/User';
import Users from 'routes/user/Users';
import Request from 'routes/request/Request';
import Requests from 'routes/request/Requests';
import NewProfessor from 'routes/prof/NewProfessor';
import Professor from 'routes/prof/Professor';
import EditProfessor from 'routes/prof/EditProfessor';
import Professors from 'routes/prof/Professors';
import NewMajor from 'routes/major/NewMajor';
import Majors from 'routes/major/Majors';
import NewGradYear from 'routes/gradyear/NewGradYear';
import GraduatedYears from 'routes/gradyear/GraduatedYears';
import Councils from 'routes/council/Councils';
import NewNotice from 'routes/notice/NewNotice';
import Notice from 'routes/notice/Notice';
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
        <Route exact path='/requests/:id' component={Request} />
        <Route exact path='/requests' component={Requests} />
        <Route exact path='/profs/new' component={NewProfessor} />
        <Route exact path='/profs/:id' component={Professor} />
        <Route exact path='/profs/:id/edit' component={EditProfessor} />
        <Route exact path='/profs' component={Professors} />
        <Route exact path='/majors/new' component={NewMajor} />
        <Route exact path='/majors' component={Majors} />
        <Route exact path='/gradyears/new' component={NewGradYear} />
        <Route exact path='/gradyears' component={GraduatedYears} />
        <Route exact path='/councils' component={Councils} />
        <Route exact path='/notices/new' component={NewNotice} />
        <Route exact path='/notices/:id' component={Notice} />
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
  isSignedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
