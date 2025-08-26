import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { AriaRole, byRoleName, ContainerRole, inContainer } from '../support/a11y';

const { Then } = createBdd();

Then(
  /^the '(.+?)' '(.+?)'(?: in the '(.+?)' '(.+?)')? contains the text '(.+?)'$/,
  async ({ page }, name, role, containerName, containerRole, text) => {
    const scope = containerName ? inContainer(page, containerRole as ContainerRole, containerName) : page;
    const target = byRoleName(scope, role as AriaRole, name);
    await expect(target.getByText(text, { exact: true })).toBeVisible();
  }
);

Then(
  /^I see the '(.+?)' '(.+?)'$/,
  async ({ page }, name, role) => {
    await expect(byRoleName(page, role as AriaRole, name)).toBeVisible();
  }
);

Then(
  /^the '(.+?)' status contains the text '(.+?)'$/,
  async ({ page }, name, text) => {
    const status = page.getByRole('status', { name: name as string });
    await expect(status.getByText(text, { exact: true })).toBeVisible();
  }
);

Then(
  /^the full page should match the snapshot(?: masking the '(.+?)'(?: named '(.+?)')? element)?$/,
  async ({ page }, maskedRole, maskedName) => {
    const options: Parameters<typeof expect.soft>[0]['toMatchSnapshot'][0] = {
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
    };

    if (maskedRole) {
      options.mask = [byRoleName(page, maskedRole as AriaRole, maskedName || '')];
    }
    
    await expect(page).toHaveScreenshot(options);
  }
);
