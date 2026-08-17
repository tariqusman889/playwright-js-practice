import { test, expect } from '@playwright/test';

test('checkbox ko check aur uncheck karna', async ({ page }) => {
  await page.goto('https://example.com'); // apni site ka URL yahan dalein

  const checkbox = page.locator('input[type="checkbox"]');
  await expect(checkbox).toBeVisible();

  await checkbox.check();
  await expect(checkbox).toBeChecked();

  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();
});