import { test, expect } from '@playwright/test';

test.describe('Editor App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should open the command palette with Ctrl+p', async ({ page }) => {
    // Open the command palette
    await page.keyboard.press('Control+p');

    // Check if the command palette is visible
    const commandPalette = page.locator('[data-testid="command-palette"]');
    await expect(commandPalette).toBeVisible();
  });

  test('should open the command palette with Ctrl+Alt+p', async ({ page, browserName }) => {
    // Open the command palette
    await page.keyboard.press('Control+Alt+p');

    // Check if the command palette is visible
    const commandPalette = page.locator('[data-testid="command-palette"]');
    await expect(commandPalette).toBeVisible();
  });

  test('should focus on the editor when a tab is opened', async ({ page }) => {
    // Simulate opening a new tab
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('tabOpened', { detail: { tabId: 'editor1' } }));
    });

    // Check if the editor is focused
    const editor_textarea = page.locator('[data-testid="editor-core__textarea"]');
    await expect(editor_textarea).toBeFocused();
  });

  test('should close file pane when "files" view is requested and "files" is already open', async ({ page }) => {
    // Simulate closing the file pane
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('open-view', { detail: 'files' }));
    });

    // Check if the file pane is not visible
    const filePane = page.locator('#Files');
    await expect(filePane).toBeHidden();
  });
});
