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

const SEE_ALL_EXECUTIVE = gql`
  query seeAllExecutive {
    seeAllExecutive {
      id
      generation
      title
      user {
        name
      }
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
  const { data, loading } = useQuery(SEE_ALL_EXECUTIVE);
  console.log(data);

  const classes = useStyles();

  return (
    <>
      <Container maxWidth='lg' className={classes.container}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          원우회
        </Typography>
        <Grid container spacing={3} className={classes.tableContainer}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>대수</TableCell>
                    <TableCell>담당</TableCell>
                    <TableCell>이름</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading && <Loader />}
                  {!loading &&
                    data &&
                    data.seeAllExecutive &&
                    data.seeAllExecutive.map((row) => (
                      <TableRow hover key={row.id}>
                        <TableCell>{row.generation}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.user.name}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container justify='flex-end' className={classes.buttonContainer}>
          <Link to='/councils/new'>
            <Button variant='contained' color='primary'>
              원우회 추가
            </Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};
