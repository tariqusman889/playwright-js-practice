import { test, expect } from '@playwright/test';

test('Sign in, delete persona and create new persona', async ({ page }) => {

  // Login
  await page.goto('https://app.resumaic.com/auth/signin');

  const emailInput = page.getByRole('textbox', { name: 'Email Address' });
  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  const signInButton = page.getByRole('button', { name: 'Sign In' });

  await expect(signInButton).toBeVisible();

  await emailInput.fill('herbanashine@gmail.com');
  await passwordInput.fill('Tariq@123');
  await signInButton.click();

  // Wait for dashboard
  await expect(page).toHaveURL(/dashboard/);

  // Open Edit Persona
  const editPersona = page.getByRole('button', { name: /Edit persona/i }).first();
  await expect(editPersona).toBeVisible();
  await editPersona.click();

  // Experience Section
  await page.getByRole('button', { name: 'Experience' }).click();

  await page.getByRole('textbox').nth(4).fill('2026-07-23');
  await page.getByRole('textbox').nth(5).fill('2026-07-16');

  // Open remaining sections
  const sections = [
    'Skills',
    'Education',
    'Languages',
    'Certifications',
    'Projects',
    'Interests'
  ];

  for (const section of sections) {
    await page.getByRole('button', { name: section }).click();
  }

  // Back
  const backButton = page.getByRole('button', {
    name: 'Back',
    exact: true
  });

  for (let i = 0; i < 7; i++) {
    await backButton.click();
  }

  // Wait until Persona tab is visible
  const personaTab = page.locator("//span[normalize-space()='Persona']");
  await expect(personaTab).toBeVisible();
  await personaTab.click();

  // Wait until Persona page loads
  await expect(
    page.getByRole('button', { name: 'Create Persona' })
  ).toBeVisible();

  // Delete Persona
  const deleteButton = page
    .getByRole('button', { name: /Delete persona/i })
    .first();

  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  // Confirm Delete
  const confirmDelete = page.getByRole('button', { name: /^Delete$/ });

  await expect(confirmDelete).toBeVisible();
  await confirmDelete.click();

  // Wait for delete to finish
  await expect(
    page.getByRole('button', { name: 'Create Persona' })
  ).toBeVisible();

  // Create Persona
  const createPersona = page.getByRole('button', {
    name: 'Create Persona'
  });

  await createPersona.click();

  // Verify Upload PDF screen
  const uploadPdf = page.getByRole('button', {
    name: 'Upload PDF'
  });

  await expect(uploadPdf).toBeVisible();

  console.log('✅ Persona deleted successfully and Create Persona screen opened.');

});