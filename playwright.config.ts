import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // ... other configs
  use: {
    /* Run headless in CI, headed locally if desired */
    headless: true, // or: process.env.CI ? true : false,
    trace: 'on-first-retry',
  },
  // ...
});