import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AllInclusiveIcon from '@material-ui/icons/AllInclusiveRounded';
import { makeStyles } from '@material-ui/core/styles';

export const Heading = () => {
  const classes = useStyles();
  const { paper, avatar } = classes;
  return (
    <div className={paper}>
      <Avatar className={avatar}>
        <AllInclusiveIcon style={{ color: '#fff', fontSize: 30 }} />
      </Avatar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
}));
