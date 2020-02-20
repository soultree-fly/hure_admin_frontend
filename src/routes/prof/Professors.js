import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <Container maxWidth='lg' className={classes.container}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        교수 List
      </Typography>
      <Grid container justify='flex-end'>
        <Link to='/profs/new'>
          <Button variant='contained' color='primary'>
            교수 추가
          </Button>
        </Link>
      </Grid>
    </Container>
  );
};
