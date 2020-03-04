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
  button: {
    paddingTop: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  floatRight: {
    float: 'right'
  }
}));
