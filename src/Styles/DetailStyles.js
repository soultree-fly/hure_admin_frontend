import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  list: {
    backgroundColor: theme.palette.background.paper
  },
  name: {
    fontWeight: 700
  },
  avatarContainer: {
    width: theme.spacing(30),
    verticalAlign: 'top'
  },
  avatar: {
    width: theme.spacing(30),
    height: '100%'
  },
  subtitle: {
    fontWeight: 600
  },
  buttonContainer: {
    paddingTop: theme.spacing(1)
  },
  editButton: {
    padding: 0,
    marginLeft: theme.spacing(1)
  },
  deleteButton: {
    padding: 0,
    marginLeft: theme.spacing(1)
  }
}));
