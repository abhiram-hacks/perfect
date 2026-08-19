// @ts-check
const { devices } = require('@playwright/test');
const { trace } = require('node:console');



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout : 30*1000,
  expect: {
    timeout : 5000
  },
  reporter : 'html',

  use: {
    browserName : 'chromium',
    headless : false,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },

 
};
module.exports = config

