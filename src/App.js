import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from 'Components/Router';

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
      <Router isSignedIn={isSignedIn} />
      <ToastContainer position='bottom-left' />
    </>
  );
};
