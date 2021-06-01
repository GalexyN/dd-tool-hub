import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

export const CSLStorage = ({ handleDelete, contractNumberTags}) => {
  const classes = useStyles();

  return (
    <div className={classes.cslStorage}>
      {contractNumberTags.length
        ? contractNumberTags.map((data) => {
            return (
              <li key={data.key}>
                <Chip
                  label={data.label}
                  onDelete={
                    data.label === 'React'
                      ? undefined
                      : handleDelete(data)
                  }
                  className={classes.chip}
                  color="primary"
                />
              </li>
            );
          })
        : null}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  cslStorage: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    marginTop: theme.spacing(3),
  },
  chip: {
    margin: theme.spacing(0.5),
    fontSize: '1rem',
    borderRadius: '10px',
    backgroundColor: '#0076df',
  },
}));
