import { test, expect } from '@playwright/test';

test.describe('E2E Example Tests', () => {
  test('homepage should load and have a title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/./);
    await expect(page.locator('body')).toBeVisible();
  });

  test('unknown path should return 4xx', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-12345');
    expect(response?.status()).toBeGreaterThanOrEqual(400);
  });
});