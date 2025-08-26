import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: 'tests/steps/**/*.ts',
  outputDir: 'tests/.features-gen'
});

export default defineConfig({
  testDir,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 20_000
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI
  },
  snapshotDir: 'tests/__snapshots__/',
  reporter: [
    ['list'],
    ['html', { open: 'on-failure' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
});
