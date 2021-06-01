import React from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

export const LoadingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <CircularProgress />
      <Typography component="h1" variant="h5">
        Generating your data hold on!
      </Typography>
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
}));
