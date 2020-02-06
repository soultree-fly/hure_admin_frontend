import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from 'routes/Auth';
import Contacts from 'routes/Contacts';

const SignedInRoutes = () => <Route exact path='/' component={Contacts} />;

const SignedOutRoutes = () => <Route exact path='/' component={Auth} />;

const AppRouter = ({ isSignedIn }) => (
  <Router>
    <Switch>{isSignedIn ? <SignedInRoutes /> : <SignedOutRoutes />};</Switch>
  </Router>
);

AppRouter.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default AppRouter;
