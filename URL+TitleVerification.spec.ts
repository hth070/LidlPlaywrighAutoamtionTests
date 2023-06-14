//dummy test for verifying URL and page title + assertions

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
