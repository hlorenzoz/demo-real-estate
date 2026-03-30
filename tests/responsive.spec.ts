import { test, expect } from '@playwright/test';

test.describe('Real Estate Template Home Page Verification', () => {
  test('should load the home page and show the primary value prop', async ({ page }) => {
    // Note: We test the local dev server or build
    await page.goto('/');
    
    // Check H1 Branding
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('vivienda');
    
    // Check Value Prop
    await expect(page.getByText('calidez humana')).toBeVisible();
  });

  test('should have a visible search bar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await expect(page.getByPlaceholder('¿Qué buscas hoy?')).toBeVisible();
  });

  test('should have a visible inquiry CTA', async ({ page }) => {
    await page.goto('/');
    const contactLink = page.getByRole('link', { name: 'Contactar' }).first();
    await expect(contactLink).toBeVisible();
  });

  test('should show the free appraisal section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Tasación Gratuita')).toBeVisible();
  });
});
