import{test,expect} from '@playwright/test'

test('HiddenDropdown',async({page})=>{

    //open OrangeHRM url
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    //locate username input box and type user name
    await page.locator("[name='username']").fill("Admin")

    //locate password input box and enter password 
    await page.locator("[name='password']").fill("admin123")

    //locate login button and perform click action
    await page.getByRole('button',{name:'Login'}).click()


    //locate PIM link and perform click action
    await page.getByRole('link',{name:'PIM'}).click()


    ////////////Hidden Dropdown handling//////////////////////
    //locate job title dropdown and click on it
    await page.locator('.oxd-select-text-input').nth(2).click()

    
    //add pause of 3 sec so we can visually see the drop down
    await page.waitForTimeout(3000) //for demo only

    //waitForSelector waits untill the given element appears or becomes visible
    await page.waitForSelector('.oxd-select-dropdown[role="listbox"]',{state:'visible'})

    //locate all dropdown options
    const options = page.locator('.oxd-select-option span')

    //count() returns the total number of matching element 
    const count = await options.count()
    //print on terminal
    console.log("Total options:",count)

    //loop through each dropdown option using index
    for (let i=0; i<count;i++)
    {
        //innerText() reads only the visible text shown to the user
        const text = await options.nth(i).innerText()
        console.log(text)
    }

    await page.locator('.oxd-select-option span',{hasText:'Head of Support'}).click()

    await page.waitForTimeout(5000)
})