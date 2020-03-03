import React from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
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

export default args => {
  const {
    data,
    loading,
    page,
    lastPage,
    selected,
    confirmLoading,
    handleSelectAllClick,
    handleClick,
    handlePageChange,
    handleButtonClick
  } = args;
  const classes = useStyles();

  const isSelected = id => selected.indexOf(id) !== -1;

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
                  {!loading && data && data.howManyRequest && (
                    <TableCell padding='checkbox'>
                      <Checkbox
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < data.howManyRequest
                        }
                        checked={
                          data.howManyRequest > 0 &&
                          selected.length === data.howManyRequest
                        }
                        onChange={handleSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                      />
                    </TableCell>
                  )}
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
                  data.seeAllRequest.map(row => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `table-checkbox-${row.id}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.id)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell id={labelId} scope='row'>
                          {row.name}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.cellPhone}</TableCell>
                        <TableCell>{row.major.name}</TableCell>
                        <TableCell>{row.graduatedYear.generation}</TableCell>
                      </TableRow>
                    );
                  })}
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
      <Grid container justify='flex-end' className={classes.button}>
        <Button
          variant='contained'
          color='primary'
          disabled={selected.length === 0 || confirmLoading}
          onClick={handleButtonClick}
        >
          {`선택된 ${selected.length}건의 요청 승인`}
        </Button>
      </Grid>
    </Container>
  );
};
