import React from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
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

import { useStyles } from 'Styles/TableStyles';

const SEE_ALL_MAJOR = gql`
  {
    seeAllMajor {
      id
      name
      howManyUsers
      howManyProfs
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
    </TableRow>
  </>
);

export default () => {
  const { data, loading } = useQuery(SEE_ALL_MAJOR);

  const classes = useStyles();

  return (
    <>
      <Container maxWidth='lg' className={classes.container}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          전공
        </Typography>
        <Grid container className={classes.tableContainer}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>전공명</TableCell>
                  <TableCell>재학생 + 졸업생 명수</TableCell>
                  <TableCell>교수 명수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && <Loader />}
                {!loading &&
                  data &&
                  data.seeAllMajor &&
                  data.seeAllMajor.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.howManyUsers}</TableCell>
                      <TableCell>{row.howManyProfs}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container justify='flex-end' className={classes.buttonContainer}>
          <Link to='/majors/new'>
            <Button variant='contained' color='primary'>
              전공 추가
            </Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};
