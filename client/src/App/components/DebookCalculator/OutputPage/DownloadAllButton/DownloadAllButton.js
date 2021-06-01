import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImportExportRoundedIcon from '@material-ui/icons/ImportExportRounded';
import json2csv from 'json2csv';
import JSZip from 'jszip';
import Button from '@material-ui/core/Button';
import { saveAs } from 'file-saver';

const zip = JSZip();

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

export const DownloadAllButton = ({ rows }) => {
  const classes = useStyles();
  const { button } = classes;
  const makeAndDownloadZip = () => {
    csvData = json2csvParser.parse(rows);
    zip.file('DEBOOK_AMOUNTS.csv', csvData);
    let img = zip.folder('Debook-Confirmation-Screenshots');
    rows.forEach(el => {
      img.file(
        `${el.csl}-DEBOOK-SCREENSHOT-CONFIRMATION.jpeg`,
        el.screenshotBufferData
      );
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'ALL_DATA.zip')
    });
  }
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      className={button}
      startIcon={<ImportExportRoundedIcon />}
      onClick={makeAndDownloadZip}
    >
      DOWNLOAD ALL
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.25),
    padding: '0.25rem 1rem',
  },
}));
