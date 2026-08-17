import { test, expect } from '@playwright/test';

test('login and create persona with manual entry', async ({ page }) => {
  // ---------- Step 1: Go to the site and start sign in ----------
  await page.goto('https://www.resumaic.com/');
  await page.getByRole('link', { name: 'Get Started' }).first().click();
  await page.goto('https://app.resumaic.com/auth/signin');

  // ---------- Step 2: Log in ----------
  const loginEmailInput = page.getByRole('textbox', { name: 'Email Address' });
  const loginPasswordInput = page.getByRole('textbox', { name: 'Password' });
  // Using getByRole for the checkbox instead of getByText('Remember me').
  // getByText matches ANY text on the page (even inside unrelated wrappers),
  // which is why Codegen also recorded a broken click on
  // getByText('Email AddressPasswordRemember') by accident. getByRole is
  // the correct, stable way to target the actual checkbox.
  const rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
  const signInButton = page.getByRole('button', { name: 'Sign In' });

  await loginEmailInput.fill('herbanashine@gmail.com');
  await loginPasswordInput.fill('Tariq@123');
  await rememberMeCheckbox.check();
  await signInButton.click();

  // Confirm login actually succeeded before moving on
  await expect(page).toHaveURL(/dashboard/);

  // ---------- Step 3: Go to Persona section and start creating one ----------
  await page.goto('https://app.resumaic.com/dashboard/persona');

  const personaNavButton = page.getByRole('button', { name: 'Persona', exact: true });
  const createPersonaButton = page.getByRole('button', { name: 'Create Persona' });
  const startManualEntryButton = page.getByRole('button', { name: 'Start Manual Entry' });

  await personaNavButton.click();
  await createPersonaButton.click();
  await startManualEntryButton.click();

  // ---------- Step 4: Fill basic persona info ----------
  const personaNameInput = page.getByRole('textbox', { name: 'John Doe' });
  const personaRoleInput = page.getByRole('textbox', { name: 'Software Engineer' });
  const personaEmailInput = page.getByRole('textbox', { name: 'john@example.com' });
  const personaPhoneInput = page.getByRole('textbox', { name: '+1 (555) 123-' });

  await personaNameInput.fill('tariq');
  await personaRoleInput.fill('Software engg');
  await personaEmailInput.fill('tariq@gmail.com');
  await personaPhoneInput.fill('03065930327');

  await expect(personaNameInput).toHaveValue('tariq');

  // ---------- Step 5: Location + address ----------
  const personaLocationCombobox = page.getByRole('combobox', { name: 'Location autocomplete' });
  const lahoreSuggestion = page.getByText('Lahore, Pakistan');
  const addressInput = page.getByRole('textbox', { name: 'Main St' });
  const linkedinInput = page.getByRole('textbox', { name: 'https://linkedin.com/in/your-' });

  await personaLocationCombobox.fill('lahore');
  await lahoreSuggestion.click();

  await addressInput.fill('Lahore sanda');
  // LinkedIn field was clicked but never filled in the original recording —
  // leaving it empty is intentional here, matching the recorded behavior.
  await linkedinInput.click();

  const summaryInput = page.getByRole('textbox', { name: 'Brief professional summary...' });
  const fullSummaryText = 'my name is tariq '.repeat(10).trim();
  await summaryInput.fill(fullSummaryText);
  await expect(summaryInput).toHaveValue(fullSummaryText);

  const nextButton = page.getByRole('button', { name: 'Next' });
  await nextButton.click();

  // ---------- Step 8: Work experience ----------
  const experienceTitleInput = page.getByRole('textbox', { name: 'Senior Software Engineer' });
  const companyInput = page.getByRole('textbox', { name: 'Tech Corp' });
  const experienceLocationCombobox = page.getByRole('combobox', { name: 'Experience location' });
  const employmentTypeInput = page.getByRole('textbox', { name: 'Full-time' });
  const industryInput = page.getByRole('textbox', { name: 'Technology' });
  // These two date fields have no accessible name/label in the recording,
  // so Codegen fell back to position (`.nth()`). This is fragile — ask the
  // dev team to add labels or data-testid attributes for "Start Date" and
  // "End Date" so this can be replaced with getByLabel() or getByTestId().
  const experienceStartDateInput = page.getByRole('textbox').nth(4);
  const experienceEndDateInput = page.getByRole('textbox').nth(5);
  const currentJobSwitch = page.getByRole('switch');
  const responsibilityInput = page.getByRole('textbox', { name: 'Describe your responsibility' });

  await experienceTitleInput.fill('Junior SQA ENGG');
  await companyInput.fill('CMS');
  await experienceLocationCombobox.fill('LAHORE');
  await lahoreSuggestion.click();
  await employmentTypeInput.fill('FULL TIME ');
  await industryInput.fill('TECH');
  await experienceStartDateInput.fill('2026-07-06');
  await experienceEndDateInput.fill('2026-07-30');
  await currentJobSwitch.click();
  await responsibilityInput.fill('SQA');

  await expect(experienceTitleInput).toHaveValue('Junior SQA ENGG');

  await nextButton.click();

});