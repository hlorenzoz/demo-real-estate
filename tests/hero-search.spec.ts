import { test, expect } from '@playwright/test';

test.describe('Hero Search Autocomplete', () => {
  test('should show autocomplete results when typing in search bar', async ({ page }) => {
    // Go to home page
    await page.goto('http://localhost:3000/en');
    
    // Wait for Hero to be visible
    const searchInput = page.locator('input[placeholder="What are you looking for? (Flat, House, Land...)"]');
    await expect(searchInput).toBeVisible();
    
    // Type something that matches properties in base-content.json
    // e.g., "Villa" or "Apartment" or a location like "Main"
    await searchInput.fill('Villa');
    
    // Wait for dropdown
    const dropdown = page.locator('.glass').first(); // The dropdown has glass class in my implementation
    // Actually, I put the dropdown inside the relative container.
    // Let's look for a link within the dropdown
    const resultLink = page.locator('a[href*="/en/properties/"]').first();
    
    await expect(resultLink).toBeVisible();
    
    // Check if it contains text related to the search
    await expect(resultLink).toContainText(/Villa/i);
    
    // Clicking should navigate
    await resultLink.click();
    await expect(page).toHaveURL(/\/en\/propiedades\//);
  });

  test('should filter results on listings page when from search button', async ({ page }) => {
    await page.goto('http://localhost:3000/en');
    const searchInput = page.locator('input[placeholder="What are you looking for? (Flat, House, Land...)"]');
    await searchInput.fill('Luxury');
    
    const searchButton = page.locator('button:has-text("Search")');
    await searchButton.click();
    
    // Should navigate to listings with ?q=Luxury
    await expect(page).toHaveURL(/\/en\/properties\?q=Luxury/);
    
    // Verify results count message exists
    const resultsCount = page.locator('span:has-text("results")');
    await expect(resultsCount).toBeVisible();
  });
});
