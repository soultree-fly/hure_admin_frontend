import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useInputWithSet } from 'hooks/useInput';
import { useStyles } from 'Styles/NewStyles';

const SEE_NOTICE = gql`
  query seeNotice($id: ID!) {
    seeNotice(id: $id) {
      title
      desc
    }
  }
`;

const EDIT_NOTICE = gql`
  mutation editNotice($id: ID!, $title: String!, $desc: String!) {
    editNotice(id: $id, title: $title, desc: $desc) {
      title
    }
  }
`;

export default ({ match }) => {
  const {
    params: { id }
  } = match;
  const { data: queryData, loading: queryLoading } = useQuery(SEE_NOTICE, {
    variables: { id }
  });

  const [
    editNotice,
    { data: mutationData, loading: mutationLoading }
  ] = useMutation(EDIT_NOTICE);

  const { property: titleProps, setValue: setTitle } = useInputWithSet('');
  const { property: descProps, setValue: setDesc } = useInputWithSet('');

  useEffect(() => {
    if (queryData && queryData.seeNotice && queryData.seeNotice.title) {
      setTitle(queryData.seeNotice.title);
      setDesc(queryData.seeNotice.desc);
    }
  }, [queryData, setTitle, setDesc]);

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

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await editNotice({
        variables: {
          id,
          title: titleProps.value,
          desc: descProps.value
        }
      });
    } catch {
      toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
    }
  };

  const classes = useStyles();

  return (
    <>
      {!mutationLoading &&
        mutationData &&
        mutationData.editNotice &&
        mutationData.editNotice.title && <Redirect push to='/notices' />}
      <Container className={classes.root}>
        <Grid className={classes.title} item xs={12}>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            공지 수정
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
                id='title'
                label='제목'
                name='title'
                autoComplete='title'
                {...titleProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='desc'
                label='내용'
                name='desc'
                multiline
                {...descProps}
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
