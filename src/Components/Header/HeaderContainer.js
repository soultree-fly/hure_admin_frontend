import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import HeaderPresenter from './HeaderPresenter';

const LOCAL_SIGN_OUT = gql`
  mutation adminSignOut {
    adminSignOut @client
  }
`;

export default ({ children }) => {
  const [signOut] = useMutation(LOCAL_SIGN_OUT);

  const onSignOutClick = () => {
    signOut();
  };

  return (
    <HeaderPresenter children={children} onSignOutClick={onSignOutClick} />
  );
};
