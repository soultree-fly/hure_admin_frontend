import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import { useStyles } from 'Styles/DetailStyles';
import Alert from 'components/Alert';

const SEE_PROF = gql`
  query seeProf($id: ID!) {
    seeProf(id: $id) {
      name
      email
      workPhone
      position
      title
      company
      order
      photo
    }
  }
`;

const DELETE_PROF = gql`
  mutation deleteProf($id: ID!) {
    deleteProf(id: $id) {
      id
    }
  }
`;

export default ({ match }) => {
  const {
    params: { id }
  } = match;
  const { data, loading } = useQuery(SEE_PROF, { variables: { id } });

  const [deleteProf, { loading: mutationLoading, error }] = useMutation(
    DELETE_PROF
  );

  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDeleteButtonClick = async event => {
    handleOpen();
  };

  const onConfirm = async () => {
    await deleteProf({ variables: { id } });
    if (error) toast.error('Delete 실패. 나중에 다시 시도해주십시오.');
    else setRedirect(true);
  };

  const classes = useStyles();

  return (
    <>
      {redirect && <Redirect to='/profs' />}
      <Alert
        type='warning'
        open={open}
        setOpen={setOpen}
        title='경고'
        desc='정말로 삭제하시겠습니까?'
        onConfirm={onConfirm}
      />
      <Container maxWidth='lg' className={classes.container}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          교수 상세
        </Typography>
        <Table>
          <TableBody>
            {(loading || mutationLoading) && (
              <TableRow>
                <TableCell>
                  <Skeleton animation='wave' />
                </TableCell>
              </TableRow>
            )}
            {!loading && !mutationLoading && data && data.seeProf && (
              <>
                <TableRow>
                  <TableCell rowSpan={12} className={classes.avatarContainer}>
                    <Avatar
                      variant='rounded'
                      alt='Profile Photo'
                      src={data.seeProf.photo}
                      className={classes.avatar}
                    />
                  </TableCell>
                  <TableCell colSpan={2} align='center'>
                    <Typography
                      variant='h4'
                      className={classes.name}
                      style={{ display: 'inline' }}
                    >
                      {data.seeProf.name + ' '}
                    </Typography>
                    <Typography variant='h6' style={{ display: 'inline' }}>
                      {data.seeProf.position}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} align='center'>
                    <Typography variant='h6'>{data.seeProf.title}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeProf.email}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      사무실/회사 전화
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeProf.workPhone}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      회사
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeProf.company}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      표시 순서
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeProf.order}</Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <Grid container justify='flex-end' className={classes.buttonContainer}>
          <Link to={`/profs/${id}/edit`}>
            <Button
              variant='contained'
              color='default'
              className={classes.button}
              disabled={loading || mutationLoading}
            >
              수정
            </Button>
          </Link>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            disabled={loading || mutationLoading}
            onClick={handleDeleteButtonClick}
          >
            삭제
          </Button>
        </Grid>
      </Container>
    </>
  );
};
