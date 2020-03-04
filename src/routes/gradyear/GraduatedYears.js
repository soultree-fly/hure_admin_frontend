import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
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

import { useStyles } from 'Styles/TableStyles';
import { toast } from 'react-toastify';

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

const DELETE_GRAD_YEAR = gql`
  mutation deleteGradYear($id: ID!) {
    deleteGradYear(id: $id) {
      generation
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
  const { data, loading, refetch } = useQuery(SEE_ALL_GRAD_YEAR);
  const [deleteGradYear, { loading: deleteLoading, error }] = useMutation(
    DELETE_GRAD_YEAR
  );

  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = id => {
    setOpen(true);
    setSelected({ id: id });
  };

  const handleClose = () => {
    setOpen(false);
    setSelected({});
  };

  const handleClick = async (event, id) => {
    handleOpen(id);
  };

  const handleConfirm = async () => {
    setOpen(false);
    await deleteGradYear({ variables: { id: selected.id } });
    if (error) toast.error('Delete 실패. 나중에 다시 시도해주십시오.');
    else {
      setSelected({});
      refetch();
    }
  };

  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Card className={classes.paper}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  경고
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  정말로 삭제하시겠습니까?
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.floatRight}>
              <Button onClick={handleClose} size='small' color='primary'>
                취소
              </Button>
              <Button onClick={handleConfirm} size='small' color='primary'>
                확인
              </Button>
            </CardActions>
          </Card>
          {/* <div className={classes.paper}>
            <h2 id='transition-modal-title'>정말로 삭제하시겠습니까?</h2>
            <p id='transition-modal-description'>
              react-transition-group animates me.
            </p>
          </div> */}
        </Fade>
      </Modal>
      <Container maxWidth='lg' className={classes.container}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          기수
        </Typography>
        <Grid container className={classes.tableContainer}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>기수</TableCell>
                  <TableCell>연도</TableCell>
                  <TableCell>학기</TableCell>
                  <TableCell padding='default' align='right'>
                    삭제
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(loading || deleteLoading) && <Loader />}
                {!loading &&
                  !deleteLoading &&
                  data &&
                  data.seeAllGradYear &&
                  data.seeAllGradYear.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.generation}기</TableCell>
                      <TableCell>{row.year}년</TableCell>
                      <TableCell>{row.semester}학기</TableCell>
                      <TableCell padding='default' align='right'>
                        <IconButton
                          onClick={event => handleClick(event, row.id)}
                          aria-label='delete'
                          style={{ padding: 0 }}
                        >
                          <DeleteIcon fontSize='inherit' />
                        </IconButton>
                      </TableCell>
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
