import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

const SEE_MAJOR = gql`
  query seeMajor($id: ID!) {
    seeMajor(id: $id) {
      name
      shortName
    }
  }
`;

const EDIT_MAJOR = gql`
  mutation editMajor($id: ID!, $name: String!, $shortName: String!) {
    editMajor(id: $id, name: $name, shortName: $shortName) {
      id
    }
  }
`;

export default ({ match }) => {
  const {
    params: { id },
  } = match;
  const history = useHistory();

  const { data, loading } = useQuery(SEE_MAJOR, { variables: { id } });
  const [
    editMajor,
    { data: mutationData, loading: mutationLoading },
  ] = useMutation(EDIT_MAJOR);

  const { property: nameProps, setValue: setName } = useInputWithSet('');
  const { property: shortProps, setValue: setShortName } = useInputWithSet('');

  useEffect(() => {
    if (data && data.seeMajor && data.seeMajor.name) {
      setName(data.seeMajor.name);
      setShortName(data.seeMajor.shortName);
    }
  }, [data, setName, setShortName]);

  if (mutationData && mutationData.createMajor && mutationData.createMajor.id) {
    toast.success('등록이 완료되었습니다.');
  }

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await editMajor({
        variables: {
          id,
          name: nameProps.value,
          shortName: shortProps.value,
        },
      });
    } catch {
      toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
    } finally {
      history.push('/majors');
    }
  };

  const LoadingCheckButton = ({ loading }) =>
    loading || mutationLoading ? (
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
            전공 수정
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
                {...nameProps}
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
                {...shortProps}
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
