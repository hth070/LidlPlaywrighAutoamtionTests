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
        // Input asterisk into the search field and submit
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
            await expect(page.locator('.s-page-heading__text')).toHaveText('8199 produktov');
        } catch (error) {
            console.log("Failed to verify search result: ", error);
            throw error;  // re-throw the error
        }

    } catch (error) {
        console.log("Test failed due to an error: ", error);
    }

    try {
        // Verify the "Kategórie" facet
        const kategorieFacet = await page.locator('button[data-testselector="category-facet"]');
        await page.waitForSelector('button[data-testselector="category-facet"]', { state: 'visible' });
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
        console.log("Failed to verify 'Kategórie' facet or option: ", error);
        throw error;  // re-throw the error
      }

      try {
        // Verify the "Cena" Facet Section Button
        const cenaFacetButton = await page.locator('button[data-testselector="price-facet"]');
        await page.waitForSelector('button[data-testselector="price-facet"]', { state: 'visible' });
        const cenaFacetButtonText = await cenaFacetButton.first().textContent();
        expect(cenaFacetButtonText).toMatch('Cena')

        // Verify the Range Inputs within the "Cena" Facet Section
        const minRangeInput = await page.waitForSelector('input[data-testselector="price-facet-range-input-minValue"]');
        await expect(minRangeInput.isVisible()).toBeTruthy();

        const maxRangeInput = await page.waitForSelector('input[data-testselector="price-facet-range-input-maxValue"]');
        await expect(maxRangeInput.isVisible()).toBeTruthy();

        // Verify the Facet Range
        const facetRange = await page.waitForSelector('input[data-testselector="price-facet-range"]');
        await expect(facetRange.isVisible()).toBeTruthy();

        // Verify the Divider
        const divider = await page.waitForSelector('span.s-facet-range__divider');
        await expect(divider.isVisible()).toBeTruthy();

        // Verify the Range Wrapper
        const rangeWrapper = await page.waitForSelector('div.s-facet-range__wrapper');
        await expect(rangeWrapper.isVisible()).toBeTruthy();

        // Verify the Range Progress
        const rangeProgress = await page.waitForSelector('div.s-facet-range__progress');
        await expect(rangeProgress.isVisible()).toBeTruthy();

    } catch (error) {
        console.log("Failed to verify 'Cena' facet or option: ", error);
    }

    try {
        // Verify the "Značka" Facet Section Button
        const znackaFacetButton = await page.locator('button[data-testselector="brand-facet"]');
        await page.waitForSelector('button[data-testselector="brand-facet"]', { state: 'visible' });
        const znackaFacetButtonText = await znackaFacetButton.first().textContent();
        expect(znackaFacetButtonText).toContain('Značka');
      
        // Verify Značka search input field is present
        await expect(page.locator('input#searchInput_Značka')).toBeVisible();
        let searchInputFieldZnačka = await page.locator('input#searchInput_Značka');
        await expect(searchInputFieldZnačka).toHaveCount(1);

        // Verify Značka subfacet list for 'LIVARNO home', 'PARKSIDE', 'esmara',
        // 'CRIVIT', 'lupilu', 'ERNESTO', 'LIVERGY', '-', 'SILVERCREST KITCHEN TOOLS', 'Playtive'
        const elementLivanoHome = await page.locator('span.brand-facet-LIVARNO.home-notSelected');
        await expect(elementLivanoHome.first()).toHaveText('LIVARNO home');

        const elementPARKSIDE = page.locator('span.brand-facet-PARKSIDE-notSelected');
        await expect(elementPARKSIDE.first()).toHaveText('PARKSIDE');

        const elementEsmara = await page.locator('span.brand-facet-esmara-notSelected');
        await expect(elementEsmara.first()).toHaveText('esmara');

        const elementCRIVIT = await page.locator('span.brand-facet-CRIVIT-notSelected');
        await expect(elementCRIVIT.first()).toHaveText('CRIVIT');

        const elementLupilu = await page.locator('span.brand-facet-lupilu-notSelected');
        await expect(elementLupilu.first()).toHaveText('lupilu');

        const elementERNESTO = await page.locator('span.brand-facet-ERNESTO-notSelected');
        await expect(elementERNESTO.first()).toHaveText('ERNESTO');

        const elementLIVERGY = await page.locator('span.brand-facet-LIVERGY-notSelected');
        await expect(elementLIVERGY.first()).toHaveText('LIVERGY');

        const elementDash = await page.locator('span.brand-facet---notSelected');
        await expect(elementDash.first()).toHaveText('-');

        const elementSKT = await page.locator('span.brand-facet-SILVERCREST.KITCHEN.TOOLS-notSelected');
        await expect(elementSKT.first()).toHaveText('SILVERCREST KITCHEN TOOLS');

        const elementPlaytive = await page.locator('span.brand-facet-Playtive-notSelected');
        await expect(elementPlaytive.first()).toHaveText('Playtive');

        const buttonElement = await page.locator('button.s-facet__collapse-link');
        expect(await buttonElement.count()).toBeGreaterThan(0);


          } catch (error) {
            console.log("Failed to verify 'Značka' facet or option: ", error);
            throw error; // re-throw the error
          }

    try {

        // Verify the "Fabra" Facet Section Button
        const fabraFacetButton = await page.locator('button[data-testselector="color-facet"]');
        await page.waitForSelector('button[data-testselector="color-facet"]', { state: 'visible' });
        const fabraFacetButtonText = await fabraFacetButton.first().textContent();
        expect(fabraFacetButtonText).toContain('Farba');

        // Verify Fabra subfacet list for 'biela', 'béžová', 'fialová', 'hnedá', 
        //'modrá', 'oranžová', 'ružová', 'strieborná', 'telová', 'tyrkysová',
        //'viacfarebná', 'zelená', 'zlatá', 'červená' , 'čierna' , 'šedá', 'žltá'

        const elementBiela = await page.locator('span.s-facet-preview__label.color-facet-biela-notSelected');
        await expect(elementBiela.first()).toHaveText('biela');

        const elementbBežová = await page.locator('span.s-facet-preview__label.color-facet-béžová-notSelected');
        await expect(elementbBežová.first()).toHaveText('béžová');

        const elementFialová = await page.locator('span.s-facet-preview__label.color-facet-fialová-notSelected');
        await expect(elementFialová.first()).toHaveText('fialová');

        const elementHnedá = await page.locator('span.s-facet-preview__label.color-facet-hnedá-notSelected');
        await expect(elementHnedá.first()).toHaveText('hnedá');

        const elementModrá = await page.locator('span.s-facet-preview__label.color-facet-modrá-notSelected');
        await expect(elementModrá.first()).toHaveText('modrá');

        const elementRužová= await page.locator('span.s-facet-preview__label.color-facet-ružová-notSelected');
        await expect(elementRužová.first()).toHaveText('ružová');

        const elementStrieborná= await page.locator('span.s-facet-preview__label.color-facet-strieborná-notSelected');
        await expect(elementStrieborná.first()).toHaveText('strieborná');

        const elementTelová= await page.locator('span.s-facet-preview__label.color-facet-telová-notSelected');
        await expect(elementTelová.first()).toHaveText('telová');

        const elementTyrkysová= await page.locator('span.s-facet-preview__label.color-facet-tyrkysová-notSelected');
        await expect(elementTyrkysová.first()).toHaveText('tyrkysová');

        const elementZelená= await page.locator('span.s-facet-preview__label.color-facet-zelená-notSelected');
        await expect(elementZelená.first()).toHaveText('zelená');

        const elementZlatá= await page.locator('span.s-facet-preview__label.color-facet-zlatá-notSelected');
        await expect(elementZlatá.first()).toHaveText('zlatá');

        const elementČervená= await page.locator('span.s-facet-preview__label.color-facet-červená-notSelected');
        await expect(elementČervená.first()).toHaveText('červená');

        const elementČierna= await page.locator('span.s-facet-preview__label.color-facet-čierna-notSelected');
        await expect(elementČierna.first()).toHaveText('čierna');

        const elementŠedá= await page.locator('span.s-facet-preview__label.color-facet-šedá-notSelected');
        await expect(elementŠedá.first()).toHaveText('šedá');

        const elementŽltá= await page.locator('span.s-facet-preview__label.color-facet-žltá-notSelected');
        await expect(elementŽltá.first()).toHaveText('žltá');

              } catch (error) {
            console.log("Failed to verify 'Fabra' facet or option: ", error);
            throw error; // re-throw the error
          }

    });   