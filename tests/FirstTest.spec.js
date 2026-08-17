//const { test, expect } = require('@playwright/test');
import { test,expect } from '@playwright/test';
test ('my test',async ({page}) => {

    console.log( 'page.title:', page.title());
    console.log('page url:', page.url());
    await expect(page).toHaveTitle(/Google/);
})















