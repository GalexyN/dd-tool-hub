import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import RedoRoundedIcon from '@material-ui/icons/RedoRounded';
import { Link as RouterLink } from 'react-router-dom';

export const RestartButton = ({ resetState }) => {
  const classes = useStyles();

  const { button } = classes;
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      className={button}
      onClick={resetState}
      startIcon={<RedoRoundedIcon />}
    >
      <RouterLink to={'./debookHelper'}>Restart</RouterLink>
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.25),
    padding: '0.25rem 1rem',
  },
}));
