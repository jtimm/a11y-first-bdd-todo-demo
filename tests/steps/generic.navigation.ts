import { createBdd } from 'playwright-bdd';

const { Given } = createBdd();

Given('I open the app', async ({ page }) => {
  await page.goto('/');
});
