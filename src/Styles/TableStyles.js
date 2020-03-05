import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  tableContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  table: {
    minWidth: 650
  },
  buttonContainer: {
    paddingTop: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(2)
  }
}));
