import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
  query signIn($username: String!, $password: String!) {
    signIn(username: $username, passwd: $password)
  }
`;

export const LOCAL_SIGN_IN = gql`
  mutation adminSignIn($token: String!) {
    adminSignIn(token: $token) @client
  }
`;
