import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import { useStyles } from 'Styles/TableStyles';
import Alert from 'components/Alert';

const SEE_ALL_USER = gql`
  query seeAllUser(
    $limit: Int!
    $page: Int!
    $major: String
    $generation: Int
  ) {
    seeAllUser(
      limit: $limit
      page: $page
      major: $major
      generation: $generation
    ) {
      id
      name
      email
      cellPhone
      major {
        name
      }
      graduatedYear {
        generation
      }
    }
    howManyUser
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const Loader = () => (
  <>
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
      <TableCell>
        <Skeleton animation='wave' />
      </TableCell>
      <TableCell>
        <Skeleton animation='wave' />
      </TableCell>
    </TableRow>
  </>
);

export default () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const limit = 10;
  const [getUsers, { data, loading, refetch }] = useLazyQuery(SEE_ALL_USER, {
    variables: { limit, page }
  });
  useEffect(() => {
    getUsers();
    if (data && data.howManyUser) {
      setLastPage(Math.ceil(data.howManyUser / limit));
    }
  }, [getUsers, data]);

  const [deleteUser, { loading: mutationLoading, error }] = useMutation(
    DELETE_USER
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onConfirm = async () => {
    await deleteUser({ variables: { id: selected.id } });
    if (error) toast.error('Delete 실패. 나중에 다시 시도해주십시오.');
    else {
      setSelected({});
      refetch();
    }
  };

  const classes = useStyles();

  return (
    <>
      {redirect && selected && <Redirect to={`/users/${selected.id}`} />}
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
          유저
        </Typography>
        <Grid container spacing={3} className={classes.tableContainer}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>학과</TableCell>
                    <TableCell>기수</TableCell>
                    <TableCell align='right'>액션</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(loading || mutationLoading) && <Loader />}
                  {!loading &&
                    !mutationLoading &&
                    data &&
                    data.seeAllUser &&
                    data.seeAllUser.map(row => (
                      <TableRow hover key={row.id}>
                        <TableCell
                          onClick={event => handleRowClick(event, row.id)}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          onClick={event => handleRowClick(event, row.id)}
                        >
                          {row.email}
                        </TableCell>
                        <TableCell
                          onClick={event => handleRowClick(event, row.id)}
                        >
                          {row.cellPhone}
                        </TableCell>
                        <TableCell
                          onClick={event => handleRowClick(event, row.id)}
                        >
                          {row.major.name}
                        </TableCell>
                        <TableCell
                          onClick={event => handleRowClick(event, row.id)}
                        >
                          {row.graduatedYear.generation}
                        </TableCell>
                        <TableCell align='right'>
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
            {!loading && lastPage && page && (
              <Grid container justify='center'>
                <Pagination
                  count={lastPage}
                  page={page}
                  onChange={handlePageChange}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid container justify='flex-end' className={classes.buttonContainer}>
          <Link to='/users/new'>
            <Button variant='contained' color='primary'>
              유저 추가
            </Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};
