import { browser, Config } from 'protractor';

import dotenv = require('dotenv')
dotenv.config()

export const config: Config = {
  framework: 'mocha',
  specs: ['../test/ui/**/*.spec.js'],
  seleniumAddress: process.env.SELENIUM_ADDRESS,
  SELENIUM_PROMISE_MANAGER: false,
  mochaOpts: {
    reporter: 'mochawesome-screenshots',
    reporterOptions: {
      reportDir: 'report/report-ui',
      reportName: 'index',
      takePassedScreenshot: true,
      clearOldScreenshots: true,
      shortScrFileNames: false,
      overwrite: false,
      multiReport: true,
  }, 
    timeout: 600000,
  },
  onPrepare: async () => {
    await browser.waitForAngularEnabled(false);
    await browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(0);
  },
  multiCapabilities: [
    {
      browserName: 'firefox',
      name: 'firefox-tests',
      shardTestFiles: true,
      maxInstances: 1,
    },
    {
      browserName: 'chrome',
      name: 'chrome-tests',
      shardTestFiles: true,
      maxInstances: 1,
    },
  ],
};
