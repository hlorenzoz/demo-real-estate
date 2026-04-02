import { test, expect } from '@playwright/test';

test.describe('Home Page Interactions', () => {

  test('Hero Search Autocomplete should navigate to detail page', async ({ page }) => {
    // Go to home page
    await page.goto('/en', { waitUntil: 'networkidle' });
    
    // Check H1 Branding exists
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    
    // Wait for Hero search input to be visible
    const searchInput = page.locator('input').first();
    await expect(searchInput).toBeVisible();
    
    // Type something that matches properties in base-content.json
    await searchInput.fill('Villa');
    
    // Check debug count has items
    const debugCount = page.getByTestId('debug-count');
    await expect(debugCount).not.toHaveText('0', { timeout: 5000 });
    
    // Wait for dropdown
    const resultLink = page.getByTestId('hero-search-result').first();
    await resultLink.waitFor({ state: 'visible', timeout: 5000 });
    
    // Check if it contains text related to the search
    await expect(resultLink).toContainText(/Villa/i);
    
    // Clicking should navigate
    await resultLink.click();
    
    // REASON FOR FIX: Individual property detail pages are still under the /en/listings/ path.
    // The previous test expected /en/properties/ which is the new unified hub path, not the detail page path.
    await page.waitForURL(/\/(listings|listados)\//);
    expect(page.url()).toMatch(/\/(listings|listados)\/.+/);
  });

  test('Check Listings CTA in home section should point to /en/listings', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' });
    
    // Identify the "Featured Properties" section link
    const listingsCta = page
      .locator('section#featured-properties')
      .getByRole('link', { name: /check listings/i });
      
    const href = await listingsCta.getAttribute('href');
    
    // Following user request: "Change it to /listings" and "Fixed E2E to verify" 
    expect(href).toBe('/en/listings');
  });

  test('Check Rentals CTA in home section should point to /en/rentals', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' });
    
    const rentalsCta = page
      .locator('section#rentals')
      .getByRole('link', { name: /check rentals/i });
      
    const href = await rentalsCta.getAttribute('href');
    
    expect(href).toBe('/en/rentals');
  });

});
