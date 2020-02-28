import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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
import moment from 'moment';

import { useStyles } from 'Styles/TableStyles';

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
    </TableRow>
  </>
);

export default () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const limit = 10;
  const [getNotices, { data, loading }] = useLazyQuery(SEE_ALL_NOTICE, {
    variables: { limit, page }
  });
  useEffect(() => {
    getNotices();
    if (data && data.howManyNotice) {
      setLastPage(Math.ceil(data.howManyNotice / limit));
    }
  }, [getNotices, data]);
  const classes = useStyles();
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
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
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && <Loader />}
                {!loading &&
                  data &&
                  data.seeAllNotice &&
                  data.seeAllNotice.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.desc}</TableCell>
                      <TableCell>
                        {moment(row.createdAt).format('YYYY. M. D.')}
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
      {/* <Grid container justify='flex-end' className={classes.button}>
        <Link to='/notices/new'>
          <Button variant='contained' color='primary'>
            공지 추가
          </Button>
        </Link>
      </Grid> */}
    </Container>
  );
};
