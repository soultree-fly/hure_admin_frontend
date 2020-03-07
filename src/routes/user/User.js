import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';

import { useStyles } from 'Styles/DetailStyles';
import Alert from 'components/Alert';

const SEE_USER = gql`
  query seeUser($id: ID!) {
    seeUser(id: $id) {
      name
      birthday
      email
      cellPhone
      company
      companyDesc
      team
      position
      workPhone
      workAddress
      photo
      major {
        name
      }
      graduatedYear {
        generation
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default ({ match }) => {
  const {
    params: { id }
  } = match;
  const { data, loading } = useQuery(SEE_USER, { variables: { id } });

  const [deleteUser, { loading: mutationLoading, error }] = useMutation(
    DELETE_USER
  );

  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDeleteButtonClick = async event => {
    handleOpen();
  };

  const onConfirm = async () => {
    await deleteUser({ variables: { id } });
    if (error) toast.error('Delete 실패. 나중에 다시 시도해주십시오.');
    else setRedirect(true);
  };

  const classes = useStyles();

  return (
    <>
      {redirect && <Redirect to='/users' />}
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
          유저 상세
        </Typography>
        <Table>
          <TableBody>
            {(loading || mutationLoading) && (
              <TableRow>
                <TableCell>
                  <Skeleton animation='wave' />
                </TableCell>
              </TableRow>
            )}
            {!loading && !mutationLoading && data && data.seeUser[0] && (
              <>
                <TableRow>
                  <TableCell rowSpan={12} className={classes.avatarContainer}>
                    <Avatar
                      variant='rounded'
                      alt='Profile Photo'
                      src={data.seeUser[0].photo}
                      className={classes.avatar}
                    />
                  </TableCell>
                  <TableCell colspan={2} align='center'>
                    <Typography variant='h4' className={classes.name}>
                      {data.seeUser[0].name}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colspan={2} align='center'>
                    <Typography variant='h6'>
                      {data.seeUser[0].major.name}{' '}
                      {data.seeUser[0].graduatedYear.generation}기
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      생일
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>
                      {moment(data.seeUser[0].birthday).format('YYYY. M. D.')}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      휴대전화
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeUser[0].cellPhone}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeUser[0].email}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      회사명
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeUser[0].company}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      부서
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeUser[0].team}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      직책
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeUser[0].position}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align='right'
                    style={{ verticalAlign: 'baseline' }}
                  >
                    <Typography color='primary' className={classes.subtitle}>
                      업무설명
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    {data.seeUser[0].companyDesc.map(row => (
                      <Typography key={row}>{row}</Typography>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      회사전화
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeUser[0].workPhone}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>
                    <Typography color='primary' className={classes.subtitle}>
                      회사주소
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography>{data.seeUser[0].workAddress}</Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <Grid container justify='flex-end' className={classes.buttonContainer}>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            disabled={loading}
            onClick={handleDeleteButtonClick}
          >
            삭제
          </Button>
        </Grid>
      </Container>
    </>
  );
};
