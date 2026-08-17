import { test, expect } from '@playwright/test'

test('DropdownDemo', async ({ page }) => {

    //open url
    await page.goto("https://practice.expandtesting.com/dropdown")

    //locate dropdown
    const countryDropdown = page.locator('#country')
    //Ways to select options
    //1. By using label
    // await countryDropdown.selectOption({label:'India'})
    // expect(countryDropdown).toHaveValue('IN')

    //2. By value
    //  await countryDropdown.selectOption({value:'IS'})
    // expect(countryDropdown).toHaveValue('IS')

    //3. By Index (Avoid using this in real time)

    //select the dropdown option at index 1 (2nd option)
    await countryDropdown.selectOption({ index: 1 }) //Afganistan

    //retrieve the value attribute of the currently selected option
    const selectedValue = await countryDropdown.inputValue()

    //verify that a value has been selected and it is not empty
    expect(selectedValue).not.toBe('');
    // expect(countryDropdown).toHaveValue('AF')


    ///////////////Assertion-1 validate number of options

    // Locate all <option> elements inside the country dropdown
    const options = countryDropdown.locator('option');

    // Count how many options are present in the dropdown
    const optionCount = await options.count();
    //console.log(optionCount)
    // Assert that the dropdown contains more than 200 options
    // This validates that the dropdown is properly populated
    expect(optionCount).toBeGreaterThan(200);

    //Assertion2: validate presence of value
    // Retrieve the visible text of all <option> elements in the dropdown
    // This returns an array of country names as strings
    const allCountries = await options.allTextContents();

    // Verify that "India" is present in the dropdown options
    expect.soft(allCountries).toContain('India123');

    // Verify that "United States" is present in the dropdown options
    expect(allCountries).toContain('United States');

    await page.waitForTimeout(5000) //pause for demo purpose

})