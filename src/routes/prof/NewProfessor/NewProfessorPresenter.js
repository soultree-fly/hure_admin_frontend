import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useStyles } from 'Styles/NewStyles';
import Dropzone from 'components/Dropzone';

export default args => {
  const {
    name,
    title,
    position,
    majorName,
    inputLabel,
    labelWidth,
    email,
    workPhone,
    company,
    order,
    setFile,
    queryData,
    queryLoading,
    onSubmit,
    loading,
    axiosLoading
  } = args;

  const LoadingCheckButton = ({ loading }) =>
    loading || axiosLoading ? (
      <Button type='submit' fullWidth variant='contained' disabled>
        Loading
      </Button>
    ) : (
      <Button type='submit' fullWidth variant='contained' color='primary'>
        Submit
      </Button>
    );

  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <Grid className={classes.title} item xs={12}>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            교수 추가
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='name'
                label='이름'
                name='name'
                autoComplete='name'
                autoFocus
                {...name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='title'
                label='구분 (교수 / 명예교수)'
                name='title'
                autoComplete='title'
                {...title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='position'
                label='직위'
                name='position'
                autoComplete='position'
                {...position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant='outlined'
                required
                fullWidth
                disabled={queryLoading}
              >
                <InputLabel ref={inputLabel} id='majorName-label'>
                  전공
                </InputLabel>
                <Select
                  labelId='majorName-label'
                  id='majorName'
                  fullWidth
                  {...majorName}
                  labelWidth={labelWidth}
                >
                  {!queryLoading &&
                    queryData &&
                    queryData.seeAllMajor &&
                    queryData.seeAllMajor.map(row => (
                      <MenuItem key={row.name} value={row.name}>
                        {row.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                {...email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                fullWidth
                id='workPhone'
                label='전화번호 (사무실, 회사)'
                name='workPhone'
                autoComplete='workPhone'
                {...workPhone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                fullWidth
                id='company'
                label='회사'
                name='company'
                autoComplete='companyName'
                {...company}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='none'
                required
                fullWidth
                id='order'
                label='순서'
                name='order'
                autoComplete='order'
                {...order}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' color='textPrimary'>
                사진
              </Typography>
              <Dropzone setFile={setFile} />
            </Grid>
            <Grid item xs='auto' sm={4} />
            <Grid item xs={12} sm={4}>
              <LoadingCheckButton loading={loading} />
            </Grid>
            <Grid item xs='auto' sm={4} />
          </Grid>
        </form>
      </Container>
    </>
  );
};
