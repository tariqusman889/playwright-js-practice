const { test, expect } = require('@playwright/test');

test('fill and submit practice form', async ({ page }) => {
  // Step 1: Go to the practice website
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');

  // Step 2: Store locators in variables (easier to read and reuse)
  const nameInput = page.getByRole('textbox', { name: 'Enter Name' });
  const emailInput = page.getByRole('textbox', { name: 'Enter EMail' });
  const phoneInput = page.getByRole('textbox', { name: 'Enter Phone' });
  const addressInput = page.getByRole('textbox', { name: 'Address:' });
  const maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
  const tuesdayCheckbox = page.getByRole('checkbox', { name: 'Tuesday' });
  const countryDropdown = page.getByLabel('Country:');
  const colorsDropdown = page.getByLabel('Colors:');
  const sortedListDropdown = page.getByLabel('Sorted List:');
  const startDateInput = page.getByPlaceholder('Start Date');
  const endDateInput = page.getByPlaceholder('End Date');
  // NOTE: This page has MORE than one "Submit" button — the blog's sidebar
  // has a "Follow by Email" widget with its own Submit button. So we cannot
  // use getByRole('button', { name: 'Submit' }) alone, it matches 2 elements.
  // We scope it to our form's container to get the correct one.
  const submitButton = page
    .locator('#post-body-1307673142697428135')
    .getByRole('button', { name: 'Submit' });

  // Step 3: Fill personal details
  await nameInput.fill('TARIQ USMAN');
  await emailInput.fill('tariqusman@gmail.com');
  await phoneInput.fill('0306593032');
  await addressInput.fill('lahore');

  // Step 4: Select gender and day
  await maleRadio.check();
  await tuesdayCheckbox.check();

  // Step 5: Select dropdown values
  await countryDropdown.selectOption('uk');
  await colorsDropdown.selectOption('green');
  await sortedListDropdown.selectOption('lion');

  // Step 6: Fill date range
  await startDateInput.fill('2026-07-16');
  await endDateInput.fill('2026-07-23');

  // Step 7: Verify the form data before submitting
  await expect(nameInput).toHaveValue('TARIQ USMAN');
  await expect(emailInput).toHaveValue('tariqusman@gmail.com');
  await expect(phoneInput).toHaveValue('0306593032');
  await expect(addressInput).toHaveValue('lahore');
  await expect(maleRadio).toBeChecked();
  await expect(tuesdayCheckbox).toBeChecked();

  // Step 8: Submit the form
  await expect(submitButton).toBeVisible();
  await submitButton.click();
});