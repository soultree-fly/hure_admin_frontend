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
import { makeStyles } from '@material-ui/core/styles';

const SEE_ALL_GRAD_YEAR = gql`
  {
    seeAllGradYear {
      id
      year
      semester
      generation
      createdAt
      updatedAt
    }
  }
`;

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  tableContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  table: {
    minWidth: 650
  },
  button: {
    paddingTop: theme.spacing(2)
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
    </TableRow>
  </>
);

export default () => {
  const classes = useStyles();
  const { data, loading } = useQuery(SEE_ALL_GRAD_YEAR);

  return (
    <>
      <Container maxWidth='lg' className={classes.container}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          기수
        </Typography>
        <Grid container className={classes.tableContainer}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Generation</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Semester</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && <Loader />}
                {!loading &&
                  data &&
                  data.seeAllGradYear &&
                  data.seeAllGradYear.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.generation}</TableCell>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>{row.semester}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container justify='flex-end' className={classes.button}>
          <Link to='/gradyears/new'>
            <Button variant='contained' color='primary'>
              기수 추가
            </Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};
