import type { Locator, Page } from '@playwright/test';

export type AriaRole = 'alert' | 'alertdialog' | 'application' | 'article' | 'banner' | 'button' | 'checkbox' | 'columnheader' | 'combobox' | 'complementary' | 'contentinfo' | 'definition' | 'dialog' | 'directory' | 'document' | 'feed' | 'figure' | 'form' | 'grid' | 'gridcell' | 'group' | 'heading' | 'img' | 'link' | 'list' | 'listbox' | 'listitem' | 'log' | 'main' | 'marquee' | 'math' | 'menu' | 'menubar' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'navigation' | 'none' | 'note' | 'option' | 'presentation' | 'progressbar' | 'radio' | 'radiogroup' | 'region' | 'row' | 'rowgroup' | 'rowheader' | 'scrollbar' | 'search' | 'searchbox' | 'separator' | 'slider' | 'spinbutton' | 'status' | 'switch' | 'tab' | 'table' | 'tablist' | 'tabpanel' | 'term' | 'textbox' | 'timer' | 'toolbar' | 'tooltip' | 'tree' | 'treegrid' | 'treeitem';
export type ContainerRole = 'region' | 'dialog' | 'form'
export type OptionContainerRole = 'combobox' | 'listbox'

export function byRoleName(
  scope: Page | Locator,
  role: AriaRole,
  name: string | RegExp
): Locator {
  return scope.getByRole(role as any, { name });
}

export function inContainer(page: Page, role: ContainerRole, name: string): Locator {
  return page.getByRole(role as any, { name });
}

export function inOptionContainer(page: Page, role: OptionContainerRole, name: string): Locator {
  return page.getByRole(role as any, { name });
}
