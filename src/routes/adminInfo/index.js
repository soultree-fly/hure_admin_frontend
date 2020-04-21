import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useInputWithSet } from 'hooks/useInput';
import { useStyles } from 'Styles/NewStyles';
import { toast } from 'react-toastify';

const SEE_ADMIN_INFO = gql`
  query seeAdminInfo {
    seeAdminInfo
  }
`;

const EDIT_ADMIN_INFO = gql`
  mutation editAdminInfo($name: String!, $phone: String!, $email: String!) {
    editAdminInfo(name: $name, phone: $phone, email: $email)
  }
`;

export default ({ history }) => {
  const { data: queryData, loading: queryLoading } = useQuery(SEE_ADMIN_INFO);
  const [
    editAdmin,
    { data: mutationData, loading: mutationLoading },
  ] = useMutation(EDIT_ADMIN_INFO);

  const { property: nameProps, setValue: setName } = useInputWithSet('');
  const { property: phoneProps, setValue: setPhone } = useInputWithSet('');
  const { property: emailProps, setValue: setEmail } = useInputWithSet('');

  useEffect(() => {
    if (queryData && queryData.seeAdminInfo) {
      setName(queryData.seeAdminInfo[0]);
      setPhone(queryData.seeAdminInfo[1]);
      setEmail(queryData.seeAdminInfo[2]);
    }
  }, [queryData, setName, setPhone, setEmail]);

  if (mutationData && mutationData.editAdminInfo) {
    toast.success('수정이 완료되었습니다.');
  }

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await editAdmin({
        variables: {
          name: nameProps.value,
          phone: phoneProps.value,
          email: emailProps.value,
        },
      });
    } catch {
      toast.error('수정 실패. 나중에 다시 시도해주십시오.');
    } finally {
      history.push('/users');
    }
  };

  const LoadingCheckButton = () =>
    queryLoading || mutationLoading ? (
      <Button type='submit' fullWidth variant='contained' disabled>
        Loading
      </Button>
    ) : (
      <Button type='submit' fullWidth variant='contained' color='primary'>
        Submit
      </Button>
    );

  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <Grid className={classes.title} item xs={12}>
          <Typography conponent='h2' variant='h6' color='primary' gutterBottom>
            관리자 정보 수정
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='name'
                label='이름'
                name='name'
                {...nameProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='phone'
                label='전화번호'
                name='phone'
                {...phoneProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                {...emailProps}
              />
            </Grid>
            <Grid item xs='auto' sm={4} />
            <Grid item xs={12} sm={4}>
              <LoadingCheckButton />
            </Grid>
            <Grid item xs='auto' sm={4} />
          </Grid>
        </form>
      </Container>
    </>
  );
};
