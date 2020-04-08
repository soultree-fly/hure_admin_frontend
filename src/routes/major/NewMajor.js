import React from 'react';
import { useHistory } from 'react-router-dom';
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

const CREATE_MAJOR = gql`
  mutation createMajor($name: String!, $shortName: String!) {
    createMajor(name: $name, shortName: $shortName) {
      id
    }
  }
`;

export default () => {
  const history = useHistory();

  const [addMajor, { data, loading }] = useMutation(CREATE_MAJOR);

  const name = useInput('');
  const shortName = useInput('');

  if (data && data.createMajor && data.createMajor.id) {
    toast.success('등록이 완료되었습니다.');
  }

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await addMajor({
        variables: {
          name: name.value,
          shortName: shortName.value,
        },
      });
    } catch {
      toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
    } finally {
      history.push('/majors');
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
      <Container className={classes.root}>
        <Grid className={classes.title} item xs={12}>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            전공 추가
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
                id='majorName'
                label='전공명'
                name='majorName'
                autoComplete='majorName'
                {...name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='majorShortName'
                label='짧은 전공명'
                name='majorShortName'
                autoComplete='majorShortName'
                {...shortName}
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
