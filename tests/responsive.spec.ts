import { test, expect } from '@playwright/test';

test.describe('INMO3 Home Page Verification', () => {
  test('should load the home page and show the primary value prop', async ({ page }) => {
    // Note: We test the local dev server or build
    await page.goto('/');
    
    // Check H1 Branding
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Xinzo de Limia');
    
    // Check Value Prop
    await expect(page.getByText('Profesionalismo, transparencia y calidez humana')).toBeVisible();
  });

  test('should have a visible search bar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await expect(page.getByPlaceholder('¿Qué buscas hoy?')).toBeVisible();
  });

  test('should have a functional WhatsApp CTA', async ({ page }) => {
    await page.goto('/');
    const whatsappLink = page.locator('a[href*="wa.me"]');
    await expect(whatsappLink).toBeVisible();
    await expect(whatsappLink).toHaveAttribute('href', /.*34988461585.*/);
  });

  test('should show the free appraisal section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Tasaciones Gratuitas')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Solicitar Tasación Gratuita' })).toBeVisible();
  });
});
