// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 40000,
  retries:1,
  workers: 5,
  
  projects:[
  {
    name: 'Chrome',
    use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'only-on-failure',
      trace: 'retain-on-failure',
    },
  },
] 
});


