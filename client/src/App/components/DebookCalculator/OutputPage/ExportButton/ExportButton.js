import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ImportExportRoundedIcon from '@material-ui/icons/ImportExportRounded';
import { CSVLink } from 'react-csv';
import json2csv from 'json2csv';

const fields = [
  'csl',
  'grossDebookAmount',
  'grossCreditAmount',
  'contractStartDate',
  'contractEndDate',
  'totalContractValue',
];

const { Parser } = json2csv;
const json2csvParser = new Parser({ fields });
let csvData;

export const ExportButton = ({ rows }) => {
  const classes = useStyles();
  const { button } = classes;
  if (rows) {
    csvData = json2csvParser.parse(rows);
    return (
      <CSVLink data={csvData} filename={'CSV_DATA.csv'} target="_blank">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={button}
          startIcon={<ImportExportRoundedIcon />}
          download="CSV_DATA.csv"
        >
          CSV
        </Button>
      </CSVLink>
    );
  } else {
    return <div></div>;
  }
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.25),
    padding: '0.25rem 1rem',
  },
}));
