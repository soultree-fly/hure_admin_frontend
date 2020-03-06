import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

import { useStyles } from 'Styles/TableStyles';
import Alert from 'components/Alert';

const SEE_ALL_NOTICE = gql`
  query seeAllNotice($limit: Int!, $page: Int!) {
    seeAllNotice(limit: $limit, page: $page) {
      id
      title
      desc
      createdAt
    }
    howManyNotice
  }
`;

const DELETE_NOTICE = gql`
  mutation deleteNotice($id: ID!) {
    deleteNotice(id: $id) {
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
    </TableRow>
  </>
);

export default () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const limit = 10;
  const [getNotices, { data, loading, refetch }] = useLazyQuery(
    SEE_ALL_NOTICE,
    {
      variables: { limit, page }
    }
  );
  useEffect(() => {
    getNotices();
    if (data && data.howManyNotice) {
      setLastPage(Math.ceil(data.howManyNotice / limit));
    }
  }, [getNotices, data]);

  const [deleteNotice, { loading: mutationLoading, error }] = useMutation(
    DELETE_NOTICE
  );

  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = id => {
    setOpen(true);
    setSelected({ id });
    console.log(selected);
  };

  const handleDeleteClick = (event, id) => {
    handleOpen(id);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onConfirm = async () => {
    await deleteNotice({ variables: { id: selected.id } });
    if (error) toast.error('Delete 실패. 나중에 다시 시도해주십시오.');
    else {
      setSelected({});
      refetch();
    }
  };

  const classes = useStyles();

  return (
    <>
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
          공지
        </Typography>
        <Grid container spacing={3} className={classes.tableContainer}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>제목</TableCell>
                    <TableCell>내용</TableCell>
                    <TableCell>작성일자</TableCell>
                    <TableCell align='right'>액션</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(loading || mutationLoading) && <Loader />}
                  {!loading &&
                    !mutationLoading &&
                    data &&
                    data.seeAllNotice &&
                    data.seeAllNotice.map(row => (
                      <TableRow hover key={row.id}>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.desc}</TableCell>
                        <TableCell>
                          {moment(row.createdAt).format('YYYY. M. D.')}
                        </TableCell>
                        <TableCell align='right'>
                          <Link to={`/notices/${row.id}/edit`}>
                            <IconButton
                              aria-label='edit'
                              className={classes.editButton}
                            >
                              <EditIcon fontSize='small' />
                            </IconButton>
                          </Link>
                          <IconButton
                            onClick={event => handleDeleteClick(event, row.id)}
                            aria-label='edit'
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
          <Link to='/notices/new'>
            <Button variant='contained' color='primary'>
              공지 추가
            </Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};
