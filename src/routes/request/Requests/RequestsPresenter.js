import React from 'react';
import { Redirect } from 'react-router-dom';
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
import Alert from 'components/Alert';

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
    rejectLoading,
    redirect,
    redirectSelected,
    alertOpen,
    setAlertOpen,
    type,
    handleSelectAllClick,
    handleCheckboxClick,
    handleRowClick,
    handlePageChange,
    handleConfirmButtonClick,
    handleRejectButtonClick,
    onConfirm
  } = args;
  const classes = useStyles();

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <>
      {redirect && redirectSelected && (
        <Redirect to={`/requests/${redirectSelected.id}`} />
      )}
      <Alert
        type={type === 'confirm' ? 'normal' : 'warning'}
        open={alertOpen}
        setOpen={setAlertOpen}
        title='경고'
        desc={
          type === 'confirm'
            ? '정말로 승인하시겠습니까?'
            : '정말로 삭제하시겠습니까?'
        }
        onConfirm={onConfirm}
      />
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

                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          aria-checked={isItemSelected}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell
                            onClick={event =>
                              handleCheckboxClick(event, row.id)
                            }
                            padding='checkbox'
                          >
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
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
        <Grid container justify='flex-end' className={classes.buttonContainer}>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            disabled={selected.length === 0 || confirmLoading || rejectLoading}
            onClick={handleRejectButtonClick}
          >
            {`선택된 ${selected.length}건의 요청 삭제`}
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={selected.length === 0 || confirmLoading || rejectLoading}
            onClick={handleConfirmButtonClick}
          >
            {`선택된 ${selected.length}건의 요청 승인`}
          </Button>
        </Grid>
      </Container>
    </>
  );
};
