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

const SEE_REQUEST = gql`
  query seeRequest($id: ID!) {
    seeRequest(id: $id) {
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

const REJECT_REQUEST = gql`
  mutation rejectRequest($id: ID!) {
    rejectRequest(id: $id) {
      id
    }
  }
`;

const CONFIRM_REQUEST = gql`
  mutation confirmRequest($id: ID!) {
    confirmRequest(id: $id) {
      id
    }
  }
`;

export default ({ match }) => {
  const {
    params: { id }
  } = match;
  const { data, loading } = useQuery(SEE_REQUEST, { variables: { id } });

  const [
    rejectRequest,
    { loading: rejectLoading, error: rejectError }
  ] = useMutation(REJECT_REQUEST);
  const [
    confirmRequest,
    { loading: confirmLoading, error: confirmError }
  ] = useMutation(CONFIRM_REQUEST);

  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRejectButtonClick = async event => {
    setType('reject');
    handleOpen();
  };

  const handleConfirmButtonClick = async event => {
    setType('confirm');
    handleOpen();
  };

  const onConfirm = async () => {
    if (type === 'confirm') {
      await confirmRequest({ variables: { id } });
      if (confirmError) toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
      else setRedirect(true);
    } else if (type === 'reject') {
      await rejectRequest({ variables: { id } });
      if (rejectError) toast.error('Delete 실패. 나중에 다시 시도해주십시오.');
      else setRedirect(true);
    }
  };

  const classes = useStyles();

  return (
    <>
      {redirect && <Redirect to='/requests' />}
      <Alert
        type={type === 'confirm' ? 'normal' : 'warning'}
        open={open}
        setOpen={setOpen}
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
          추가 요청 상세
        </Typography>
        <Table>
          <TableBody>
            {(loading || rejectLoading || confirmLoading) && (
              <TableRow>
                <TableCell>
                  <Skeleton animation='wave' />
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !rejectLoading &&
              !confirmLoading &&
              data &&
              data.seeRequest[0] && (
                <>
                  <TableRow>
                    <TableCell rowSpan={12} className={classes.avatarContainer}>
                      <Avatar
                        variant='rounded'
                        alt='Profile Photo'
                        src={data.seeRequest[0].photo}
                        className={classes.avatar}
                      />
                    </TableCell>
                    <TableCell colspan={2} align='center'>
                      <Typography variant='h4' className={classes.name}>
                        {data.seeRequest[0].name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colspan={2} align='center'>
                      <Typography variant='h6'>
                        {data.seeRequest[0].major.name}{' '}
                        {data.seeRequest[0].graduatedYear.generation}기
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
                        {moment(data.seeRequest[0].birthday).format(
                          'YYYY. M. D.'
                        )}
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
                      <Typography>{data.seeRequest[0].cellPhone}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right'>
                      <Typography color='primary' className={classes.subtitle}>
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography>{data.seeRequest[0].email}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right'>
                      <Typography color='primary' className={classes.subtitle}>
                        회사명
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography>{data.seeRequest[0].company}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right'>
                      <Typography color='primary' className={classes.subtitle}>
                        부서
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography>{data.seeRequest[0].team}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right'>
                      <Typography color='primary' className={classes.subtitle}>
                        직책
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography>{data.seeRequest[0].position}</Typography>
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
                      {data.seeRequest[0].companyDesc.map(row => (
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
                      <Typography>{data.seeRequest[0].workPhone}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right'>
                      <Typography color='primary' className={classes.subtitle}>
                        회사주소
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography>{data.seeRequest[0].workAddress}</Typography>
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
            disabled={loading || rejectLoading || confirmLoading}
            onClick={handleRejectButtonClick}
          >
            삭제
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading || rejectLoading || confirmLoading}
            onClick={handleConfirmButtonClick}
          >
            승인
          </Button>
        </Grid>
      </Container>
    </>
  );
};
