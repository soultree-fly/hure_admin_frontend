import React from 'react';
import { useDropzone } from 'react-dropzone';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  input: {
    padding: theme.spacing(2)
  },
  listTitle: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  listItem: {
    paddingLeft: theme.spacing(2)
  }
}));

export default ({ setFile }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*'
  });

  const acceptedFilesItems = acceptedFiles.map(file => (
    <ListItem key={file.name}>
      <ListItemText primary={file.path} />
    </ListItem>
  ));
  setFile(acceptedFiles);

  const { ref, ...rootProps } = getRootProps();

  const classes = useStyles();

  return (
    <>
      <RootRef rootRef={ref}>
        <Paper {...rootProps}>
          <input {...getInputProps({ accept: 'image/*' })} />
          <Typography
            className={classes.input}
            variant='subtitle1'
            align='center'
          >
            {isDragAccept && '놓으시면 저장됩니다.'}
            {isDragReject && '사진이 아니면 넣을 수 없습니다.'}
            {!isDragActive &&
              '이곳에 끌어놓으시거나 여기를 클릭하시면 사진을 넣을 수 있습니다.'}
          </Typography>
        </Paper>
      </RootRef>
      <List dense={true}>{acceptedFilesItems}</List>
    </>
  );
};
