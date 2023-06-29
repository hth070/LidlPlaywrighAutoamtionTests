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
/*
        // Input asterisk into the search field and submit
        try {
            await page.waitForSelector('#s-search-input-field');
            await page.fill('#s-search-input-field', '*');
            await page.click('button.s-search-input__button');
        } catch (error) {
            console.log("Failed to perform search with asterisk: ", error);
            throw error;  // re-throw the error
        }
*/

        try {
        const inputField = await page.waitForSelector('#s-search-input-field');
        await inputField.fill('*');
        const searchSubmitButton = await page.waitForSelector('button.s-search-input__button');
        await searchSubmitButton.click();
        } catch (error) {
            console.log("Failed to perform search with asterisk: ", error);
            throw error;  // re-throw the error
          }
  
        // Verify the search result
        try {
            await expect(page.locator('h1')).toHaveText('*');
            await expect(page.locator('.s-page-heading__text')).toHaveText('8405 produktov');
        } catch (error) {
            console.log("Failed to verify search result: ", error);
            throw error;  // re-throw the error
        }

    } catch (error) {
        console.log("Test failed due to an error: ", error);
    }

    try {
        // Verify the "Kategórie" facet
        const kategorieFacet = await page.locator('button.s-facet__heading');
        await page.waitForSelector('button.s-facet__heading', { state: 'visible' });
        const kategorieFacetText = await kategorieFacet.first().textContent();
        expect(kategorieFacetText).toMatch('Kategórie');

      
        //Verify the "Móda" option within the "Kategórie" facet
        const modaOption = await page.locator('span.category-facet-Móda-notSelected');
        await expect(modaOption.first()).toHaveText('Móda');
      
        // Verify the "Dielňa a záhrada" option within the "Kategórie" facet
        const dielnaOption = await page.locator('span.category-facet-Dielňa.a.záhrada-notSelected');
        await expect(dielnaOption.first()).toHaveText('Dielňa a záhrada');
      
        // Verify the "Šport a voľný čas" option within the "Kategórie" facet
        const sportOption = await page.locator('span.category-facet-Šport.a.voľný.čas-notSelected');
        await expect(sportOption.first()).toHaveText('Šport a voľný čas');
      
        // Verify the "Bývanie" option within the "Kategórie" facet
        const byvanieOption = await page.locator('span.category-facet-Bývanie-notSelected');
        await expect(byvanieOption.first()).toHaveText('Bývanie');
      
        // Verify the "Domácnosť" option within the "Kategórie" facet
        const domacnostOption = await page.locator('span.category-facet-Domácnosť-notSelected');
        await expect(domacnostOption.first()).toHaveText('Domácnosť');
      
        // Verify the "Detský svet" option within the "Kategórie" facet
        const detskySvetOption = await page.locator('span.category-facet-Detský.svet-notSelected');
        await expect(detskySvetOption.first()).toHaveText('Detský svet');
      } catch (error) {
        console.log("Failed to verify facet or option: ", error);
        throw error;  // re-throw the error
      }
      
});
