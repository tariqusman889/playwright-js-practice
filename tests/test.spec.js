const { test, expect } = require('@playwright/test');

test.describe('Resumaic Website Automation', () => {

  test('Verify Home Page Loads Successfully', async ({ page }) => {
    await page.goto('https://www.resumaic.com/');

    await expect(page).toHaveTitle(/Resumaic/i);

    await expect(
      page.locator('text=Build Your Resume').first()
    ).toBeVisible();
  });

  test('Verify Navigation to Terms & Service Page', async ({ page }) => {
    await page.goto('https://www.resumaic.com/');

    await page.goto('https://www.resumaic.com/terms-and-service/');

    await expect(page).toHaveURL(/terms-and-service/);

    await expect(
      page.locator('text=Terms and Service')
    ).toBeVisible();
  });

  test('Verify Build Your Resume Button Works', async ({ page }) => {
    await page.goto('https://www.resumaic.com/');

    const button = page.locator('text=Build Your Resume').first();

    await expect(button).toBeVisible();

    await button.click();

    await page.waitForLoadState('networkidle');
  });

  test('Verify FAQ Section is Visible', async ({ page }) => {
    await page.goto('https://www.resumaic.com/');

    await expect(
      page.locator('text=Frequently Asked Questions')
    ).toBeVisible();
  });

  test('Verify Contact Information Exists', async ({ page }) => {
    await page.goto('https://www.resumaic.com/');

    await expect(
      page.locator('text=Contact Us')
    ).toBeVisible();

    await expect(
      page.locator('text=@')
    ).toBeVisible();
  });

});