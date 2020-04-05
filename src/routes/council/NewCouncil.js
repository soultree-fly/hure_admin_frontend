import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import useInput from 'hooks/useInput';
import { useStyles } from 'Styles/NewStyles';
import { toast } from 'react-toastify';

const CREATE_EXECUTIVE = gql`
  mutation createExecutive(
    $generation: Int!
    $title: String!
    $userEmail: String!
  ) {
    createExecutive(
      generation: $generation
      title: $title
      userEmail: $userEmail
    ) {
      id
    }
  }
`;

export default () => {
  const [addExecutive, { loading }] = useMutation(CREATE_EXECUTIVE);

  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addExecutive({
        variables: {
          generation: parseInt(generation.value),
          title: title.value,
          userEmail: email.value,
        },
      });
      history.push('/councils');
    } catch {
      toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
    }
  };

  const generation = useInput('');
  const title = useInput('');
  const email = useInput('');

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
      <Container className={classes.root}>
        <Grid className={classes.title} item xs={12}>
          <Typography component='h2' varinat='h6' color='primary' gutterBottom>
            원우회 추가
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='generation'
                label='대수 (숫자만)'
                name='generation'
                {...generation}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='title'
                label='담당'
                name='title'
                {...title}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                {...email}
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
