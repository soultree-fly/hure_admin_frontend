import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  last: {
    paddingBottom: theme.spacing(4)
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.last}
      variant='body2'
      color='textSecondary'
      align='center'
    >
      {'© '}
      {new Date().getFullYear()}
      {' Tarrazu'}
    </Typography>
  );
};
