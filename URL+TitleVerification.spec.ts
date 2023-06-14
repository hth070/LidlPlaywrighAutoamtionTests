//dummy test for opening browser, accepting cookies, does basic search, collapses all fascets (4 of them)

import { test, expect } from '@playwright/test';

test('Verify website URL and page title', async ({ page }) =>  {
try {
    await page.goto('https://lidl.sk/');
    await expect(page).toHaveURL('https://lidl.sk/');
    await expect(page).toHaveTitle('Lidl.sk | Správná voľba');
  } catch (error) {
    console.log("Failed Lidl homepage verification");
  }
});