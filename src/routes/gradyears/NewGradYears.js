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
import { makeStyles } from '@material-ui/core/styles';

import useInput from 'hooks/useInput';

const CREATE_GRAD_YEAR = gql`
  mutation createGradYear($year: Int!, $semester: Int!, $generation: Int!) {
    createGradYear(year: $year, semester: $semester, generation: $generation) {
      generation
    }
  }
`;

const useStyles = makeStyles(theme => ({
  title: {
    paddingBottom: theme.spacing(2)
  },
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export default () => {
  const [addGradYear, { data, loading }] = useMutation(CREATE_GRAD_YEAR);

  const generation = useInput();
  const year = useInput();
  const semester = useInput();

  if (data && data.createGradYear && data.createGradYear.generation) {
    toast.success('등록이 완료되었습니다.');
  }

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await addGradYear({
        variables: {
          year: parseInt(year.value),
          semester: parseInt(semester.value),
          generation: parseInt(generation.value)
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
      {!loading &&
        data &&
        data.createGradYear &&
        data.createGradYear.generation && <Redirect to='/gradyears' />}
      <Container className={classes.root}>
        <Grid className={classes.title} item xs={12}>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            기수 추가
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
                label='기수'
                name='generation'
                autoComplete='generation'
                autoFocus
                {...generation}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='year'
                label='연도'
                name='year'
                autoComplete='year'
                {...year}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='semester'
                label='학기'
                name='semester'
                autoComplete='semester'
                {...semester}
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
