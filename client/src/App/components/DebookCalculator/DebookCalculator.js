import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// COMPONENTS //
import { Heading } from './Heading/Heading';
import { InputForm } from './InputForm/InputForm';
import { LoadingPage } from './LoadingPage/LoadingPage';
import { OutputPage } from './OutputPage/OutputPage';

// TESTING COMPONENTS //
import { TestButton } from './TestButton/TestButton';

// HELPERS //
import { formatDateString, generateRows } from './helpers';

export const DebookCalculator = () => {
  // STATE //
  const [contractNumbers, setContractNumbers] = useState('');
  const [terminationDate, setTerminationDate] = useState('');
  const [alias, setAlias] = useState('');
  const [rows, setRows] = useState([]);
  const [dateFocused, setDateFocused] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [contractNumberTags, setContractNumberTags] = useState([]);
  const [tagCount, setTagCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // METHODS //
  const resetState = () => {
    setContractNumbers(() => '');
    setRows(() => []);
    setDateFocused(() => false);
    setShowOutput(() => false);
    setContractNumberTags(() => []);
    setTagCount(() => 0);
    setLoading(() => false);
  };
  const handleDelete = (tagToDelete) => () => {
    setContractNumberTags((tags) =>
      tags.filter((tag) => tag.key !== tagToDelete.key)
    );
    setTagCount((tagCount) => tagCount--);
  };

  const handleAliasOnChange = (e) => {
    setAlias({ alias: e.target.value });
  };
  const handleTermindationDateOnChange = async (e) => {
    setTerminationDate({
      terminationDate: await formatDateString(e.target.value),
    });
  };
  const handleContractsInputOnChange = (e) => {
    setContractNumbers({ contractNumbers: e.target.value });
  };

  const handleEnterKeyPress = async (e) => {
    if (e.key === 'Enter' || e.key === 188) {
      if (contractNumbers.contractNumbers.length) {
        await setTagCount((tagCount) => ++tagCount);
        await setContractNumberTags((contractNumberTags) => [
          ...contractNumberTags,
          { key: tagCount, label: e.target.value },
        ]);
        await setContractNumbers({ contractNumbers: '' });
      }
    }
  };

  const calculateDebookAmounts = async () => {
    // console.log(`posting to debook calculator with the following information
    //   contracts: ${JSON.stringify(contractNumberTags.map((el) => el.label))},
    //   terminationDate: ${JSON.stringify(terminationDate)},
    //   alias: ${JSON.stringify(alias)},
    //   `);
    await setLoading({ loading: !loading });
    await axios
      .post(
        '/api/debookCalculator',
        {
          contract: contractNumberTags.map((el) => el.label),
          terminationDate: terminationDate.terminationDate,
          alias: alias.alias,
        },
        { 'Content-Type': 'application/json;charset=UTF-8' }
      )
      .then(async (data) => {
        await setContractNumberTags({ contractNumberTags: [] });
        await generateRows(data.data)
          .then((formattedData) => {
            return new Promise(async (resolve) => {
              await setRows(() => [...formattedData]);
              await resolve();
            });
          })
          .then(() => {
            setLoading(() => false);
            setShowOutput(() => true);
          })
      })
      .catch((err) => console.log(err));
  };

  const toggleOutput = () => setShowOutput(() => !showOutput);

  useEffect(() =>
    console.log(contractNumbers, alias, terminationDate, contractNumberTags)
  );

  return (
    <Container component="main" maxWidth="lg">
      {/* <TestButton setShowOutput={setShowOutput} showOutput={showOutput} /> */}
      <Heading />
      <Grid container spacing={1}>
        <Grid
          item
          component={Box}
          xs={12}
          sm={!showOutput ? 12 : 0}
          display={!loading && !showOutput ? '' : 'none'}
        >
          <Container maxWidth="sm">
            <InputForm
              calculateDebookAmounts={calculateDebookAmounts}
              handleDelete={handleDelete}
              contractNumbers={contractNumbers}
              handleAliasOnChange={handleAliasOnChange}
              dateFocused={dateFocused}
              handleTermindationDateOnChange={handleTermindationDateOnChange}
              handleContractsInputOnChange={handleContractsInputOnChange}
              handleEnterKeyPress={handleEnterKeyPress}
              contractNumberTags={contractNumberTags}
              setDateFocused={setDateFocused}
            />
          </Container>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          component={Box}
          display={!loading ? 'none' : ''}
        >
          <LoadingPage />
        </Grid>

        <Grid
          item
          xs={12}
          sm={!showOutput ? 0 : 12}
          component={Box}
          display={!showOutput ? 'none' : ''}
        >
          <Container maxWidth="lg">
            <OutputPage rows={rows} resetState={resetState} />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
