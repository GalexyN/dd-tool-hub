import React from 'react';
import Button from '@material-ui/core/Button';

export const TestButton = ({ setShowOutput, showOutput }) => {
  return (
    <Button onClick={() => setShowOutput(() => !showOutput)}>
      Click for hide
    </Button>
  );
};
