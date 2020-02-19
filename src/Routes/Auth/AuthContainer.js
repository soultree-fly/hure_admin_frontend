import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import useInput from 'Hooks/useInput';
import { SIGN_IN, LOCAL_SIGN_IN } from './AuthQueries';
import AuthPresenter from './AuthPresenter';

export default () => {
  const username = useInput('');
  const password = useInput('');
  const [getToken, { data, loading, error }] = useLazyQuery(SIGN_IN);
  const [setToken, { loading: mutationLoading }] = useMutation(LOCAL_SIGN_IN);

  useEffect(() => {
    if (data && data.signIn) {
      setToken({ variables: { token: data.signIn } });
    }
  }, [data, setToken]);

  // FIXME: If once error message exist, it comes up always.
  if (error) {
    toast.error('Username or password is wrong. Please try again.');
  }

  const onSubmit = e => {
    e.preventDefault();
    if (username.value === '') {
      toast.error("Username can't be empty string.");
    } else if (password.value === '') {
      toast.error("Password can't be empty string.");
    } else {
      getToken({
        variables: { username: username.value, password: password.value }
      });
    }
  };

  return (
    <AuthPresenter
      username={username}
      password={password}
      loading={loading}
      mutationLoading={mutationLoading}
      onSubmit={onSubmit}
    />
  );
};
