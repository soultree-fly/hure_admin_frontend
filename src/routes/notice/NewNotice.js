import React from 'react';
import { Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import useInput from 'hooks/useInput';
import { useStyles } from 'Styles/NewStyles';

const CREATE_NOTICE = gql`
  mutation createNotice($title: String!, $desc: String!) {
    createNotice(title: $title, desc: $desc) {
      title
    }
  }
`;

export default () => {
  const [addNotice, { data, loading }] = useMutation(CREATE_NOTICE);

  const title = useInput('');
  const desc = useInput('');

  if (data && data.createNotice && data.createNotice.title) {
    toast.success('등록이 완료되었습니다.');
  }

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await addNotice({
        variables: {
          title: title.value,
          desc: desc.value
        }
      });
    } catch {
      toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
    }
  };

  const LoadingCheckButton = ({ loading }) =>
    loading ? (
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
      {!loading && data && data.createNotice && data.createNotice.title && (
        <Redirect to='/notices' />
      )}
      <Container className={classes.root}>
        <Grid className={classes.title} item xs={12}>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            공지 추가
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
                autoFocus
                {...title}
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
                {...desc}
              />
            </Grid>
            <Grid item xs='auto' sm={4} />
            <Grid item xs={12} sm={4}>
              <LoadingCheckButton loading={loading} />
            </Grid>
            <Grid item xs='auto' sm={4} />
          </Grid>
        </form>
      </Container>
    </>
  );
};
