import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { useStyles } from 'Styles/DetailStyles';
import Alert from 'components/Alert';

const SEE_NOTICE = gql`
  query seeNotice($id: ID!) {
    seeNotice(id: $id) {
      title
      desc
    }
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
    </TableRow>
    <TableRow>
      <TableCell>
        <Skeleton animation='wave' />
      </TableCell>
    </TableRow>
  </>
);

export default ({ match }) => {
  const {
    params: { id }
  } = match;
  const { data, loading } = useQuery(SEE_NOTICE, { variables: { id } });

  const [deleteNotice, { loading: mutationLoading, error }] = useMutation(
    DELETE_NOTICE
  );

  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = id => {
    setOpen(true);
  };

  const handleDeleteClick = (event, id) => {
    handleOpen(id);
  };

  const onConfirm = async () => {
    await deleteNotice({ variables: { id } });
    if (error) toast.error('Delete 실패. 나중에 다시 시도해주십시오.');
    else setRedirect(true);
  };

  const classes = useStyles();

  return (
    <>
      {redirect && <Redirect to='/notices' />}
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
          공지 상세
        </Typography>
        <Grid container spacing={3} className={classes.tableContainer}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableBody>
                  {(loading || mutationLoading) && <Loader />}
                  {!loading && data && data.seeNotice && (
                    <>
                      <TableRow>
                        <TableCell>
                          <Typography
                            color='primary'
                            align='right'
                            className={classes.subtitle}
                          >
                            제목
                          </Typography>
                        </TableCell>
                        <TableCell>{data.seeNotice.title}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            color='primary'
                            align='right'
                            className={classes.subtitle}
                          >
                            내용
                          </Typography>
                        </TableCell>
                        <TableCell>{data.seeNotice.desc}</TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container justify='flex-end' className={classes.buttonContainer}>
          <Link to={`/notices/${id}/edit`}>
            <Button
              variant='contained'
              color='default'
              className={classes.button}
            >
              수정
            </Button>
          </Link>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleDeleteClick}
            className={classes.button}
          >
            삭제
          </Button>
        </Grid>
      </Container>
    </>
  );
};
