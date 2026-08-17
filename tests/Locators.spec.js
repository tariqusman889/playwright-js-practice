import { test, expect } from '@playwright/test';

test('Login SauceDemo', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    //css selector
    await page.locator('#user-name').fill('standard_user');
    //css selector
    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);
    
        //verify sucessful login
    await expect(page).toHaveURL(/inventory.html/); //verify url
    await expect(page.locator('.title')).toHaveText('Products'); //verify text

    const productElement = page.locator('.title')
    await expect(productElement).toBeVisible() //verify web elemet visibility

});