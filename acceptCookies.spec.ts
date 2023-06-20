import { test, expect } from '@playwright/test';

test('Accept cookies by fast decision pop-up', async ({ page }) => {
    try {
        await page.goto('https://lidl.sk/');
        await page.waitForSelector("button.cookie-alert-extended-button");
        await page.click("button.cookie-alert-extended-button");
      } catch (error) {
        console.log("No Cookie popup")
      }
    });