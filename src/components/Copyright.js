import React from 'react';
import Typography from '@material-ui/core/Typography';

export default () => (
  <Typography variant='body2' color='textSecondary' align='center'>
    {'© '}
    {new Date().getFullYear()}
    {' Tarrazu'}
  </Typography>
);
