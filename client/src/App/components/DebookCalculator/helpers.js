export const formatDateString = (dateString) => {
  let dateStringSplit = dateString.split('-');
  let date = new Date(
    `${dateStringSplit[1]}-${dateStringSplit[2]}-${dateStringSplit[0]}`
  ).toDateString();
  let dateSplit = date.split(' ');

  let newDate = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[3].slice(
    dateSplit[3].length - 2,
    dateSplit[3].length
  )}`;

  return newDate;
};

export const generateRows = async (arr) => {
  return await new Promise((resolve, reject) => {
    let data = arr.map((el, i) => {
      let img = btoa(
        String.fromCharCode(...new Uint8Array(el.screenshotBuffer.data))
      );
      img = 'data:image/jpeg;base64,' + img;
      return {
        id: i + 1,
        csl: el.csl,
        grossDebookAmount: el.debookAmount,
        grossCreditAmount: el.creditAmount,
        contractStartDate: el.contractStartDate,
        contractEndDate: el.contractEndDate,
        totalContractValue: el.totalContractValue,
        screenshotConfirmation: img,
        screenshotBufferData: el.screenshotBuffer.data
      };
    });
    resolve(data);
  });
};

