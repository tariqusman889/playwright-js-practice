import { test, expect } from "@playwright/test";

test('AssertionTest', async ({ page }) => {

    //open url
    await page.goto('https://www.saucedemo.com/')

    //1. Page level assertions
    //verify page title
    await expect(page).toHaveTitle('Swag Labs')

    //verify page url
    await expect(page).toHaveURL('https://www.saucedemo.com/')

    //2. Element State Assertions
    //locate username and password
    const usernameInput = page.locator('#user-name');
    const passwordInput = page.locator('#password');
    const loginButton = page.locator('#login-button');
    const errorMessage = page.locator('[data-test="error"]')

    //verify input field username and password are visisble 
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    //verify if webelemnts are enabled and editable
    await expect(usernameInput).toBeEnabled();
    await expect(passwordInput).toBeEnabled();
    await expect(loginButton).toBeEnabled();

    await expect(usernameInput).toBeEditable();
    await expect(passwordInput).toBeEditable();

    //Attribute - Assertions
    expect(usernameInput).toHaveAttribute('placeholder','Username')
expect(loginButton).toHaveAttribute('type','submit')

    //3.Text & Value Assertions

    await usernameInput.fill('standard_user');
    await expect(usernameInput).toHaveValue('standard_user');

    await passwordInput.fill('secret_sauce');
    await expect(passwordInput).toHaveValue('secret_sauce');

    //verify error message to be hidden before login attempt
    await expect(errorMessage).toBeHidden();

    await loginButton.click()

    // Page and text assertions after login

    //verify user naviaged to inventory page
    await expect(page).toHaveURL(/inventory/);

    //verify products page heading
    const productTitle = page.locator('.title')

    await expect(productTitle).toBeVisible()
    await expect(productTitle).not.toHaveText('Products')
    await expect(productTitle).toContainText('Prod')

    //class assertion
    await expect(productTitle).toHaveClass('title');

    //ID assertion - verify shoping cart id value = "shopping_cart_container"

    const cartIcon = page.locator('.shopping_cart_container')
    await expect(cartIcon).toHaveId('shopping_cart_container');

    //COUNT - ASSERTION
    //Verify total number of producs displayed 
    const productItems = page.locator('.inventory_item_name')
    await expect(productItems).toHaveCount(6)

    //Screenshot / visual assertions
    //locate web element sauce lab bag pack

    const bagitem = page.getByAltText('Sauce Labs Backpack')

    //compare screenshot with baseline screenshot
    await expect(bagitem).toHaveScreenshot('bagItem.png')

    //visual verification of shoping cart
    await expect(page).toHaveScreenshot('cartIcon.png',{
  mask: [page.locator('.shopping_cart_badge')],
});

})