import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from 'Styles/GlobalStyles';
import Routes from 'Components/Router';

const SIGNIN_STATUS = gql`
  {
    isSignedIn @client
  }
`;

export default () => {
  const {
    data: { isSignedIn }
  } = useQuery(SIGNIN_STATUS);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes isSignedIn={isSignedIn} />
        <ToastContainer position='bottom-left' />
      </Router>
    </>
  );
};
