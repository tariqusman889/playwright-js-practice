import { test, expect } from '@playwright/test';

test('Built-In Locators-practice', async({page})=>
{
    // getByPlaceholder - open sauce demo
   await page.goto('https://practice.expandtesting.com/login')

   //getByLabel - username
   await page.getByLabel('username').fill('practice')

   //getByLabel - password
   await page.getByLabel('password').fill('SuperSecretPassword!')

   //getByRole - login
   await page.getByRole('button', {name:'Login'}).click()

   //getByText - verify/Assertion
   await expect(page.getByText('You logged into a secure area!')).toBeVisible()

   //getByRole - home link
   await page.getByRole('link', {name:'Home'}).click()
   
})