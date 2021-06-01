const express = require('express');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();

// Serve the static files from the React app
app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/debookCalculator', async (req, res) => {
  let contracts = req.body.contract;
  let terminationDate = req.body.terminationDate;
  let alias = req.body.alias;
  let calculatedDebooks = [];

  const queryCSL = async (csl) => {
    let creditAmount;
    let debookAmount;
    let debookData;
    let screenshotBuffer;

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    const scrapeDebookData = () => {
      return page.evaluate(async () => {
        return await new Promise((resolve, reject) => {
          resolve([
            document.getElementById('P5_SUMOFGROSSDEBOOK').innerText,
            document.getElementById('P2_SUMGROSSCREDITAMT').innerText,
            document.getElementById('P5_START_DATE_DISPLAY').innerText,
            document.getElementById('P5_END_DATE_DISPLAY').innerText,
            document.getElementById('P5_CONTRACT_AMOUNT_DISPLAY').innerText,
          ]);
        });
      });
    };

    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(`${process.env.DEBOOK_CALCULATOR_URI}`);
    await page.$eval(
      `${process.env.DATE_SELECTOR}`,
      (e, terminationDate) => {
        e.setAttribute('value', `${terminationDate}`);
      },
      terminationDate
    );
    await page.$eval(
      `${process.env.EMAIL_SELECTOR}`,
      (e, alias) => {
        console.log(`alias: ${alias}`);
        e.setAttribute('value', `${alias}`);
      },
      alias
    );
    await page.$eval(
      `${process.env.CSL_SELECTOR}`,
      (e, csl) => {
        console.log(`csl: ${csl}`);
        e.setAttribute('value', `${csl}`);
      },
      csl
    );

    await Promise.all([
      page.click(`${process.env.SUBMIT_BUTTON}`),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    [
      debookAmount,
      creditAmount,
      contractStartDate,
      contractEndDate,
      totalContractValue,
    ] = await scrapeDebookData();

    screenshotBuffer = await page.screenshot({
      fullPage: true,
      type: 'jpeg',
    });

    debookData = {
      csl,
      debookAmount,
      creditAmount,
      contractStartDate,
      contractEndDate,
      totalContractValue,
      screenshotBuffer,
    };

    return debookData;
  };

  calculatedDebooks = await Promise.all(contracts.map((el) => queryCSL(el)));
  res.send(calculatedDebooks);
});

app.post('/api/revenueSTHelper', async (req, res) => {
  const { ddCaseUrl } = req.body;

  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
  });
  const page = await browser.newPage();

  const cookiesFilePath = 'cookies.json';

  const previousSession = fs.existsSync(cookiesFilePath);
  if (previousSession) {
    // If file exist load the cookies
    const cookiesString = fs.readFileSync(cookiesFilePath);
    const parsedCookies = JSON.parse(cookiesString);
    if (parsedCookies.length !== 0) {
      for (let cookie of parsedCookies) {
        await page.setCookie(cookie);
      }
    }
    await page.goto(ddCaseUrl);
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    // document.querySelector('input[title^="CAS"]').getAttribute('title') - dd case number
    // div[data-id^="in_case_Related_tasks-ListItemContent"] - spm case
    // div[data-id^=in_related_opportunity] div[title] - related opp

    await Promise.all([
      page.click('div[data-id^=in_related_opportunity] div[title]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
  } else {
    await page.waitForTimeout(70000).then(async () => {
      // Save Session Cookies
      const cookiesObject = await page.cookies();
      // Write cookies to temp file to be used in other profile pages
      await fs.writeFile(
        `./${cookiesFilePath}`,
        JSON.stringify(cookiesObject),
        function (err) {
          if (err) {
            console.log('The file could not be written.', err);
          }
          res.send(cookiesObject);
        }
      );
    });
  }
});

// Handles any requests that don't match the ones above
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('App is listening on port ' + port));
