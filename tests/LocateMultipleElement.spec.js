//const{test,expect}=require('@playwright/test'); //importing two thins, test function to create test and expect for assertions
import { test, expect } from '@playwright/test';

test('Locators',async({page})=>{

    //open url
    await page.goto('https://www.saucedemo.com/')

    //enter username
    await page.fill('#user-name','standard_user')

    //enter password
    await page.locator('#password').fill('secret_sauce')

    //locate login button and perform click action - By using XPATH
    await page.locator("//input[@id='login-button']").click()

    //verify sucessful login
    await expect(page).toHaveURL(/inventory.html/); //verify url
//////////////////FIRST APPROACH///////////////////////////
//     //find list of all products

//     const productNames = await page.$$('.inventory_item_name')

//     //count products and print
//    console.log('Total no. of products:',productNames.length)

//    // loog through each element and print the product name
//    for(const product of productNames)
//    {
//     const name = await product.textContent() //each element is an elementhandle
//     //textContent() is an async func, that queries the element in the browser, so you must await it
//     console.log(name)
//    }


/////////////////SECOND APPROACH//////////////////////

//Locate all product names

const productName = page.locator('.inventory_item_name');

//get total count
const count = await productName.count()
console.log('Total products:', count)

//print each product name
for(let i=0;i<count;i++)
{
    const name = await productName.nth(i).textContent();
    console.log(name)
}

})