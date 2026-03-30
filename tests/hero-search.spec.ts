import { test, expect } from '@playwright/test';

test.describe('Hero Search Autocomplete', () => {
  test('should show autocomplete results when typing in search bar', async ({ page }) => {
    // Go to home page
    await page.goto('/en', { waitUntil: 'networkidle' });
    
    // Check H1 Branding exists
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    
    // Wait for Hero search input to be visible
    const searchInput = page.getByPlaceholder(/looking for/i).first();
    await expect(searchInput).toBeVisible();
    
    // Type something that matches properties in base-content.json
    await searchInput.fill('Villa');
    
    // Wait for dropdown
    const resultLink = page.locator('a[href*="/properties/"]').first();
    await resultLink.waitFor({ state: 'visible', timeout: 5000 });
    
    // Check if it contains text related to the search
    await expect(resultLink).toContainText(/Villa/i);
    
    // Clicking should navigate
    await resultLink.click();
    await page.waitForURL(/\/properties\//);
  });

});
