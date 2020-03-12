import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  last: {
    paddingBottom: theme.spacing(4)
  },
  privacy: {
    color: '#222'
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
      <a
        href='https://www.notion.so/8e2d02bb5661401b9885ec894df867fe'
        className={classes.privacy}
      >
        개인정보처리방침
      </a>
      {' | © '}
      {new Date().getFullYear()}
      {' Tarrazu'}
    </Typography>
  );
};
