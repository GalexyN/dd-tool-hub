import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// COMPONENTS //
import { ExportButton } from './ExportButton/ExportButton';
import { RestartButton } from './RestartButton/RestartButton';
import { DownloadAllButton } from './DownloadAllButton/DownloadAllButton';

export const OutputPage = ({ rows, resetState }) => {
  const classes = useStyles();
  const { paper, output, table, buttonContainer, downloadButton, tableHead } =
    classes;

  return (
    <div className={paper}>
      <Typography component="h1" variant="h5">
        Debook Amount Outputs
      </Typography>
      <div className={buttonContainer}>
        <DownloadAllButton rows={rows ? rows : []} />
        <ExportButton rows={rows ? rows : []} />
        <RestartButton resetState={resetState} />
      </div>
      <div className={output}>
        <TableContainer>
          <Table className={table} aria-label="simple table">
            <TableHead>
              <TableRow key="header" className={tableHead}>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">CSL&nbsp;</TableCell>
                <TableCell align="center">GROSS DEBOOK AMOUNT&nbsp;</TableCell>
                <TableCell align="center">GROSS CREDIT AMOUNT&nbsp;</TableCell>
                <TableCell align="center">START DATE&nbsp;</TableCell>
                <TableCell align="center">END DATE&nbsp;</TableCell>
                <TableCell align="center">TCV&nbsp;</TableCell>
                <TableCell align="center">SCREENSHOT &nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.csl}</TableCell>
                  <TableCell align="center">{row.grossDebookAmount}</TableCell>
                  <TableCell align="center">{row.grossCreditAmount}</TableCell>
                  <TableCell align="center">{row.contractStartDate}</TableCell>
                  <TableCell align="center">{row.contractEndDate}</TableCell>
                  <TableCell align="center">{row.totalContractValue}</TableCell>
                  <TableCell align="center">
                    {
                      <Button
                        className={downloadButton}
                        variant="outlined"
                        size="small"
                        startIcon={<GetAppRoundedIcon />}
                        target="_blank"
                        href={row.screenshotConfirmation}
                        download={`${row.csl}_DEBOOK_CONFIRMATION.jpeg`}
                        color="primary"
                      ></Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
  output: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
  table: {
    minWidth: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  downloadButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  tableHead: {
    marginTop: theme.spacing(8),
    padding: '3rem',
    background: '#e0e0e0',
  },
}));
