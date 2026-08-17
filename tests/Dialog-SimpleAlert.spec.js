import{test,expect} from '@playwright/test'

test("SimpleAlterHandling",async({page})=>{

    //Step1: open url
    await page.goto("https://testpages.herokuapp.com/pages/basics/alerts-javascript/")

    //Step2: we must register the dialog handler before clicking the button
   //once means this handler will run only one time
    page.once('dialog',async dialog=>{

        //check what type of dialog it is (alert/confirm/prompt)
        expect(dialog.type()).toBe('alert');

        //Read te message shown inside the alert popup
        expect(dialog.message()).toContain('I am an alert box!')

        //click OK button on the alert
        await dialog.accept()

    })

    //Step3: click the button that opens the alert popup
     await page.getByText('Show alert box').click()

     //step4: verify that alert was handled successfully
     await expect(page.getByText('You triggered and handled the alert dialog')).toBeVisible();

     await page.waitForTimeout(3000);

})
