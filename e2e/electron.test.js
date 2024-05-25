import { _electron as electron } from 'playwright';
import { test, expect } from '@playwright/test';

test.describe('Editor App in Electron', () => {
  let electronApp;
  let page;

  test.beforeAll(async () => {
    // Launch Electron app.
    electronApp = await electron.launch({
      args: ['../out/main/index.js'],
      env: {
        ...process.env,
        NODE_ENV: 'development',
      },
    });
    
    // Get the first window that the app opens.
    page = await electronApp.firstWindow();
  });

  test.afterAll(async () => {
    // Close Electron app.
    await electronApp.close();
  });

  test.beforeEach(async () => {
    // Reload the page before each test.
    await page.reload();
  });

  test('should open the command palette with Ctrl+p', async () => {
    // Open the command palette
    await page.keyboard.press('Control+p');

    // Check if the command palette is visible
    const commandPalette = page.locator('[data-testid="command-palette"]');
    await expect(commandPalette).toBeVisible();
  });

  test('should open the command palette with Ctrl+Alt+p', async () => {
    // Open the command palette
    await page.keyboard.press('Control+Alt+p');

    // Check if the command palette is visible
    const commandPalette = page.locator('[data-testid="command-palette"]');
    await expect(commandPalette).toBeVisible();
  });

  test('should focus on the editor when a tab is opened', async () => {
    // Simulate opening a new tab
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('tabOpened', { detail: { tabId: 'editor1' } }));
    });

    // Check if the editor is focused
    const editor_textarea = page.locator('[data-testid="editor-core__textarea"]');
    await expect(editor_textarea).toBeFocused();
  });

  test('should close file pane when "files" view is requested and "files" is already open', async () => {
    // Simulate closing the file pane
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('open-view', { detail: 'files' }));
    });

    // Check if the file pane is not visible
    const filePane = page.locator('#Files');
    await expect(filePane).toBeHidden();
  });
});
