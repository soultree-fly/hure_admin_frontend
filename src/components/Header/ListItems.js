import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {
  UsersIcon,
  RequestIcon,
  ProfessorIcon,
  MajorIcon,
  GraduateIcon,
  CouncilIcon,
  NoticeIcon,
} from '../Icons';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

export const MainListItems = () => {
  const classes = useStyles();
  return (
    <div>
      <Link to='/users' className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <UsersIcon />
          </ListItemIcon>
          <ListItemText primary='Users' />
        </ListItem>
      </Link>
      <Link to='/requests' className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <RequestIcon />
          </ListItemIcon>
          <ListItemText primary='Requests' />
        </ListItem>
      </Link>
      <Link to='/profs' className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <ProfessorIcon />
          </ListItemIcon>
          <ListItemText primary='Professors' />
        </ListItem>
      </Link>
      <Link to='/majors' className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <MajorIcon />
          </ListItemIcon>
          <ListItemText primary='Majors' />
        </ListItem>
      </Link>
      <Link to='/gradyears' className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <GraduateIcon />
          </ListItemIcon>
          <ListItemText primary='Graduated Years' />
        </ListItem>
      </Link>
      <Link to='/councils' className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <CouncilIcon />
          </ListItemIcon>
          <ListItemText primary='Councils' />
        </ListItem>
      </Link>
      <Link to='/notices' className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <NoticeIcon />
          </ListItemIcon>
          <ListItemText primary='Notices' />
        </ListItem>
      </Link>
    </div>
  );
};
