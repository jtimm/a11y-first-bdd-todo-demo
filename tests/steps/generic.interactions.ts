import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd';
import { AriaRole, byRoleName, ContainerRole, inContainer, inOptionContainer, OptionContainerRole } from '../support/a11y';
import { resolveWaiter } from '../support/waiters';

const { When } = createBdd();

// Helper to detect if a wait phrase is an event
function isEventWait(phrase?: string) {
  return phrase && /the '.+' event/i.test(phrase);
}

// Click button in optional container
When(
  /^I click the '(.+?)' button(?: in the '(.+?)' '(.+?)')?(?: and wait for (.+))?$/,
  async ({ page }, name, containerName, containerRole, waitPhrase) => {
    const scope = containerName ? inContainer(page, containerRole as ContainerRole, containerName) : page;
    const target = byRoleName(scope, 'button', name);
    if (!waitPhrase) {
      await target.click();
      return;
    }
    const waiter = resolveWaiter(waitPhrase, { page, containerRole, containerName });
    if (isEventWait(waitPhrase)) {
      // Start waiting for the event before clicking
      await Promise.all([waiter(), target.click()]);
    } else {
      // For non-event waits (e.g., spinner), order doesn't matter
      await Promise.all([target.click(), waiter()]);
    }
  }
);

// Type into textbox by label name
When(
  /^I type '(.+?)' into the '(.+?)' textbox(?: in the '(.+?)' '(.+?)')?$/,
  async ({ page }, value, label, containerName, containerRole) => {
    const scope = containerName ? inContainer(page, containerRole as ContainerRole, containerName) : page;
    const input = byRoleName(scope, 'textbox', label);
    await input.fill(value);
  }
);

// Select option by visible text in a native <select>
When(
  /^I select the '(.+?)' option in the '(.+?)' '(.+?)'(?: in the '(.+?)' '(.+?)')?$/,
  async ({ page }, option, label, role, optionContainerName, optionContainerRole) => {
    const scope = optionContainerName ? inOptionContainer(page, optionContainerRole as OptionContainerRole, optionContainerName) : page;
    const combo = byRoleName(scope, role as AriaRole, label);
    await combo.selectOption({ label: option });
  }
);

// Check/Uncheck a checkbox by label, only if state differs, and always assert checked state after
When(
  /^I (check|uncheck) the '(.+?)' checkbox(?: in the '(.+?)' '(.+?)')?(?: and wait for (.+))?$/,
  async ({ page }, action, label, containerName, containerRole, waitPhrase) => {
    const scope = containerName ? inContainer(page, containerRole as ContainerRole, containerName) : page;
    const cb = byRoleName(scope, 'checkbox', label);
    const waiter = waitPhrase ? resolveWaiter(waitPhrase, { page, containerRole, containerName }) : undefined;
    if (action === 'check') {
      await expect(cb).not.toBeChecked();
      if (waitPhrase && isEventWait(waitPhrase)) {
        await Promise.all([waiter!(), cb.setChecked(true)]);
      } else if (waitPhrase) {
        await Promise.all([cb.setChecked(true), waiter!()]);
      }
      else {
        await cb.check();
      }
      // Always assert checked state
      await expect(cb).toBeChecked();
    } else if (action === 'uncheck') {
      await expect(cb).toBeChecked();
      if (waitPhrase && isEventWait(waitPhrase)) {
        await Promise.all([waiter!(), cb.setChecked(false)]);
      } else if (waitPhrase) {
        await Promise.all([cb.setChecked(false), waiter!()]);
      }
      else {
        await cb.uncheck();
      }
      // Always assert unchecked state
      await expect(cb).not.toBeChecked();
    }
  }
);
