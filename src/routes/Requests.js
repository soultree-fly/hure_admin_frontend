import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
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

import { useStyles } from 'Styles/TableStyles';

const SEE_ALL_REQUEST = gql`
  query seeAllRequest($limit: Int!, $page: Int!) {
    seeAllRequest(limit: $limit, page: $page) {
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
    howManyRequest
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
    </TableRow>
  </>
);

export default () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const limit = 10;
  const [getRequests, { data, loading }] = useLazyQuery(SEE_ALL_REQUEST, {
    variables: { limit, page }
  });
  useEffect(() => {
    getRequests();
    if (data && data.howManyRequest) {
      setLastPage(Math.ceil(data.howManyRequest / limit));
    }
  }, [getRequests, data]);
  const classes = useStyles();
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        추가 요청
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
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && <Loader />}
                {!loading &&
                  data &&
                  data.seeAllRequest &&
                  data.seeAllRequest.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.cellPhone}</TableCell>
                      <TableCell>{row.major.name}</TableCell>
                      <TableCell>{row.graduatedYear.generation}</TableCell>
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
    </Container>
  );
};
