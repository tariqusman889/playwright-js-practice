import{test,expect} from '@playwright/test'

test('iFrameHandling',async({page})=>{

    //open url
    await page.goto("file:///C:/Users/ASUS/Desktop/PlaywrightAutomationVSCodeExtn/DemoHTMLDocs/IframePractice/index.html")

    //count total iframe

   const allFrame = page.frames()
   console.log("Total number of frames:", allFrame.length)

   //Approach 1: Framelocator
   const leftFrame = page.frameLocator("iframe[name='leftFrame']")
  
   //locate name  webelement
   await leftFrame.locator("input[name='name']").fill("Prachi Gupta")
      //locate name  webelement
   await leftFrame.locator("input[name='email']").fill("Prachi@email.com")


   //Approach2- Locate Right Frame

   const rightFrame = page.frame("rightFrame")
    
   rightFrame.locator('select').selectOption('Option Two')

   rightFrame.getByText("Click Me").click()
   
   //pause for 3 sec only for demo
   await page.waitForTimeout(3000)


})