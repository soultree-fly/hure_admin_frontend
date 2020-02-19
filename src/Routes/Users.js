import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
      company
      major {
        name
      }
      graduatedYear {
        generation
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  }
}));

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

export default ({ match }) => {
  const [page, setPage] = useState();
  const limit = 10;
  const [getUsers, { data, loading }] = useLazyQuery(SEE_ALL_USER, {
    variables: { limit, page }
  });
  useEffect(() => {
    if (match.params && match.params.page) {
      setPage(parseInt(match.params.page));
    } else {
      setPage(1);
    }
    getUsers();
  }, [match.params, getUsers]);
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          Users
        </Typography>
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
                data.seeAllUser &&
                data.seeAllUser.map(row => (
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
      </Grid>
    </Grid>
  );
};
