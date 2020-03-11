import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { useStyles } from 'Styles/TableStyles';
import Alert from 'components/Alert';

const SEE_ALL_PROF = gql`
  {
    seeAllProf {
      id
      name
      position
      title
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

const Loader = () => (
  <TableRow>
    <TableCell>
      <Skeleton animation='wave' />
    </TableCell>
    <TableCell>
      <Skeleton animation='wave' />
    </TableCell>
    <TableCell>
      <Skeleton animation='wave' />
    </TableCell>
    <TableCell>
      <Skeleton animation='wave' />
    </TableCell>
  </TableRow>
);

export default () => {
  const { data, loading, refetch } = useQuery(SEE_ALL_PROF);
  const [deleteProf, { loading: mutationLoading, error }] = useMutation(
    DELETE_PROF
  );

  const [redirect, setRedirect] = useState(false);
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);

  const handleRowClick = (event, id) => {
    setSelected({ id });
    setRedirect(true);
  };

  const handleOpen = id => {
    setOpen(true);
    setSelected({ id });
  };

  const handleDeleteClick = (event, id) => {
    handleOpen(id);
  };

  const onConfirm = async () => {
    await deleteProf({ variables: { id: selected.id } });
    if (error) toast.error('Delete 실패. 나중에 다시 시도해주십시오.');
    else {
      setSelected({});
      refetch();
    }
  };

  const classes = useStyles();

  return (
    <>
      {redirect && selected && <Redirect to={`/profs/${selected.id}`} />}
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
          교수
        </Typography>
        <Grid container spacing={3} className={classes.tableContainer}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>구분</TableCell>
                    <TableCell>직책</TableCell>
                    <TableCell align='right'>액션</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(loading || mutationLoading) && <Loader />}
                  {!loading &&
                    !mutationLoading &&
                    data &&
                    data.seeAllProf &&
                    data.seeAllProf.map(row => (
                      <TableRow hover key={row.id}>
                        <TableCell
                          onClick={event => handleRowClick(event, row.id)}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          onClick={event => handleRowClick(event, row.id)}
                        >
                          {row.position}
                        </TableCell>
                        <TableCell
                          onClick={event => handleRowClick(event, row.id)}
                        >
                          {row.title}
                        </TableCell>
                        <TableCell align='right'>
                          <Link to={`/profs/${row.id}/edit`}>
                            <IconButton
                              aria-label='edit'
                              className={classes.editButton}
                            >
                              <EditIcon fontSize='small' />
                            </IconButton>
                          </Link>
                          <IconButton
                            onClick={event => handleDeleteClick(event, row.id)}
                            aria-label='delete'
                            className={classes.deleteButton}
                          >
                            <DeleteIcon fontSize='small' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container justify='flex-end' className={classes.buttonContainer}>
          <Link to='/profs/new'>
            <Button variant='contained' color='primary'>
              교수 추가
            </Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};
