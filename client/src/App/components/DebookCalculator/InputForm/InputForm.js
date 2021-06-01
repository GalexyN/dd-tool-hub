import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// COMPONENTS //
import { CalculateButton } from './CalculateButton/CalculateButton';
import { CSLStorage } from './CSLStorage/CSLStorage';

export const InputForm = ({
  calculateDebookAmounts,
  handleDelete,
  contractNumbers,
  handleAliasOnChange,
  dateFocused,
  handleTermindationDateOnChange,
  handleContractsInputOnChange,
  handleEnterKeyPress,
  contractNumberTags,
  setDateFocused
}) => {
  const classes = useStyles();
  const { card, form } = classes;
  return (
    <div className={card}>
      <Typography component="h1" variant="h5">
        Input Information
      </Typography>
      <form className={form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleAliasOnChange}
              autoComplete="alias"
              name="alias"
              variant="outlined"
              required
              fullWidth
              id="alias"
              label="Your LinkedIn Alias"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type={dateFocused ? 'date' : ''}
              onChange={handleTermindationDateOnChange}
              onFocus={() => setDateFocused(true)}
              onBlur={() => setDateFocused(false)}
              variant="outlined"
              required
              fullWidth
              label="Termination Date"
              id="terminationDate"
              name="terminationDate"
              autoComplete="termDate"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleContractsInputOnChange}
              onKeyPress={handleEnterKeyPress}
              variant="outlined"
              required
              fullWidth
              id="contractNumbers"
              label="Input Your CSL"
              name="contractNumbers"
              autoComplete="cNumbers"
              value={contractNumbers.contractNumbers}
            />
          </Grid>
        </Grid>
        <CSLStorage
          contractNumberTags={contractNumberTags}
          handleDelete={handleDelete}
        />
        <CalculateButton calculateDebookAmounts={calculateDebookAmounts} />
      </form>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(8),
    padding: '3rem',
    boxShadow: '11px 11px 12px 1px #afa0a0cc',
    border: '1px solid #dad0d0cc',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));
