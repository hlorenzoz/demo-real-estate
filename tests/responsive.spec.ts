import { test, expect } from '@playwright/test';

test.describe('Real Estate Template Home Page Verification', () => {
  test('should load the home page and show the primary value prop', async ({ page }) => {
    // Note: We test the local dev server or build
    await page.goto('/en', { waitUntil: 'networkidle' });
    
    // Check H1 Branding
    const h1 = page.getByRole('heading', { level: 1 }).first();
    await expect(h1).toBeVisible();
    // It says "Where every home tells a unique story"
    await expect(h1).toContainText(/home/i);
    
    // Check Value Prop (subtitle mentions human warmth)
    await expect(page.getByText(/human warmth/i).first()).toBeVisible();
  });

  test('should have a visible search bar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/en', { waitUntil: 'networkidle' });
    const searchInput = page.getByPlaceholder(/looking for/i).first();
    await expect(searchInput).toBeVisible();
  });

  test('should have a visible inquiry CTA', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' });
    // Contact button is mapped to "Contact" in en.json
    const contactBarFullLink = page.locator('a[href*="/contact"]').first();
    await expect(contactBarFullLink).toBeVisible();
  });

  test('should show the free appraisal section', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' });
    // In ServicesSection: "Free Appraisal"
    await expect(page.getByText(/Free Home Valuation/i).first()).toBeVisible();
  });
});
