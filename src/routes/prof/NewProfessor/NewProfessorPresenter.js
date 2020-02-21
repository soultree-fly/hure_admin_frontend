import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Dropzone from 'components/Dropzone';

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

export default args => {
  const {
    name,
    email,
    workPhone,
    position,
    title,
    company,
    order,
    setFile,
    onSubmit,
    loading,
    axiosLoading
  } = args;

  const LoadingCheckButton = ({ loading }) =>
    loading || axiosLoading ? (
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
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            교수 추가
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='name'
                label='이름'
                name='name'
                autoComplete='name'
                autoFocus
                {...name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                {...email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                fullWidth
                id='workPhone'
                label='전화번호 (사무실, 회사)'
                name='workPhone'
                autoComplete='workPhone'
                {...workPhone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='position'
                label='구분 (교수 / 명예교수)'
                name='position'
                autoComplete='position'
                {...position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='title'
                label='직책 / 학과'
                name='title'
                autoComplete='title'
                {...title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                fullWidth
                id='company'
                label='회사'
                name='company'
                autoComplete='companyName'
                {...company}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='order'
                label='순서'
                name='order'
                autoComplete='order'
                {...order}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' color='textPrimary'>
                사진
              </Typography>
              <Dropzone setFile={setFile} />
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
