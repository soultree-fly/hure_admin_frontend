import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import { useStyles } from 'Styles/AlertStyles';

export default props => {
  const { type, open, setOpen, title, desc, onConfirm } = props;
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  };

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
                <Typography
                  gutterBottom
                  color={type === 'warning' ? 'secondary' : 'primary'}
                  variant='h5'
                  component='h2'
                >
                  {title}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {desc}
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
        </Fade>
      </Modal>
    </>
  );
};
