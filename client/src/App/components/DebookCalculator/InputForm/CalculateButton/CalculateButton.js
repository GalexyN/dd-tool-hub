import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const CalculateButton = ({ calculateDebookAmounts }) => {
  const classes = useStyles();

  return (
    <Button
      onClick={calculateDebookAmounts}
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      Calcuate Debook Amounts
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
