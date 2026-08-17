import { test, expect } from '@playwright/test';

test('Built-In Locators-SauceDemo', async({page})=>
{
    // getByPlaceholder - open sauce demo
   await page.goto('https://www.saucedemo.com/')

    //getByPlaceholder - enter username
   await page.getByPlaceholder('Username').fill('standard_user')

   //enter password
   await page.getByPlaceholder('Password').fill('secret_sauce')

   //getByRole -click on login button
   await page.getByRole('button',{name:'Login'}).click()

   //Assertion
   await expect(page).toHaveURL(/inventory.html/)

    //getbyText - verify product visbility on inventory page
    await expect(page.getByText('Products')).toBeVisible()

    //getByRole() - add product sauce lab backpack to cart
    await page.getByRole('button',{name:'Add to cart'}).first().click()

    //getByAltText - click on sauce lab backpack product to vewi desc
    await page.getByAltText('Sauce Labs Backpack').click()

})