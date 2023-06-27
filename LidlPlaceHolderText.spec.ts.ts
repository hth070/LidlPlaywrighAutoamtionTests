import { test, expect } from '@playwright/test';

test('Verify website navigation and UI elements', async ({ page }) => {
    try {
        // Navigate to the homepage and verify the URL and title
        try {
            await page.goto('https://www.lidl.sk/');
            await expect(page).toHaveURL('https://www.lidl.sk/');
            await expect(page).toHaveTitle('Lidl.sk | Správna voľba');
        } catch (error) {
            console.log("Failed Lidl homepage verification: ", error);
            throw error;  // re-throw the error
        }

        // Accept cookies
        try {
            await page.waitForSelector("button.cookie-alert-extended-button");
            await page.click("button.cookie-alert-extended-button");
        } catch (error) {
            console.log("Failed to accept cookies: ", error);
            throw error;  // re-throw the error
        }

        // Click on the logo and verify it navigates to the homepage
        try {
            await page.waitForSelector('img.n-header__logo__image');
            await page.click('img.n-header__logo__image');
            await expect(page).toHaveURL('https://www.lidl.sk/');
        } catch (error) {
            console.log("Failed to verify logo navigation: ", error);
            throw error;  // re-throw the error
        }

        // Verify search input field is present
        let searchInputField;
        try {
            await expect(page.locator('#s-search-input-field')).toBeVisible();
            searchInputField = await page.locator('#s-search-input-field');
            await expect(searchInputField).toHaveCount(1);
        } catch (error) {
            console.log("Failed to verify search input box presence: ", error);
            throw error;  // re-throw the error
        }

        // Verify search submit button is present
        try {
            await expect(page.locator('button.s-search-input__button')).toBeVisible();
            const searchSubmitButton = await page.locator('button.s-search-input__button');
            await expect(searchSubmitButton).toHaveCount(1);
        } catch (error) {
            console.log("Failed to verify search submit button presence: ", error);
            throw error;  // re-throw the error
        }

        // Verify placeholder text
        try {
            const placeholderText = await searchInputField.getAttribute('placeholder');
            expect(placeholderText).toBe('Vyhľadaj obľúbený produkt, značku, kategóriu...');
        } catch (error) {
            console.log("Failed to verify placeholder text: ", error);
            throw error;  // re-throw the error
        }
    } catch (error) {
        console.log("Test failed due to an error: ", error);
    }
});
