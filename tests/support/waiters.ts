import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export type Ctx = { page: Page; containerRole?: string; containerName?: string };
export type Waiter = () => Promise<void>;

/**
 * Natural‑language wait phrases → Playwright waits.
 * Supported examples:
 *  - "the 'todo:created' event"
 *  - "the 'todo:updated' event"
 *  - "the 'todo:deleted' event"
 *  - "the 'todo:completed' event"
 *  - "the 'todo:reopened' event"
 *  - "the 'dialog:open' event"
 *  - "the 'dialog:close' event"
 *  - "the spinner to disappear"
 *  - "the 'Edit Task' dialog to appear"
 *  - "the dialog to close"
 */
export function resolveWaiter(phrase: string, ctx: Ctx): Waiter {
  const p = phrase.trim();

  const eventMatch = p.match(/^the\s+'(.+)'\s+event$/i);
  const dialogAppearMatch = p.match(/^the\s+'(.+)'\s+dialog\s+to\s+appear$/i);
  const dialogCloseMatch = p.match(/^the\s+dialog\s+to\s+close$/i);
  const spinnerMatch = p.match(/^the\s+spinner\s+to\s+disappear$/i);
  const spinnerAndEventMatch = p.match(/^the\s+'(.+)'\s+event\s+and\s+for\s+the\s+spinner\s+to\s+disappear$/i);
  const spinnerText = /loading/i;

  if (eventMatch) {
    const eventName = eventMatch[1];
    return () => waitForWindowEvent(ctx.page, eventName);
  }
  if (dialogAppearMatch) {
    const name = dialogAppearMatch[1];
    return () => ctx.page.getByRole('dialog', { name }).waitFor();
  }
  if (dialogCloseMatch) {
    return () => ctx.page.getByRole('dialog').first().waitFor({ state: 'hidden' }).catch(() => Promise.resolve());
  }
  if (spinnerMatch) {
    const spinner: Locator = ctx.page.getByRole('status', { name: spinnerText });
    return () => spinner.waitFor({ state: 'hidden' });
  }
  if (spinnerAndEventMatch) {
    const eventName = spinnerAndEventMatch[1];
    const spinner: Locator = ctx.page.getByRole('status', { name: spinnerText });
    return async () => {
      await Promise.all([
        waitForWindowEvent(ctx.page, eventName),
        expect(spinner).toBeHidden()
      ]);
    };
  }

  throw new Error(`Unsupported wait phrase: "${phrase}"`);
}

function waitForWindowEvent(page: Page, eventName: string) {
  return page.evaluate((eventName) => {
    return new Promise<void>((resolve) => {
      const handler = () => { window.removeEventListener(eventName, handler as any); resolve(); };
      window.addEventListener(eventName, handler as any, { once: true });
    });
  }, eventName);
}
