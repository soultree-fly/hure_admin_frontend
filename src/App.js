import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

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
    </>
  );
};
