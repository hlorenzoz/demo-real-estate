/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect } from '@playwright/test';

test.describe('Floating Overlays Stacking', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookie consent to ensure banner shows
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    await page.goto('/en');
  });

  test('should stack CookieBanner, PWAInstaller and WhatsAppButton without overlap', async ({ page }) => {
    // 1. Check Cookie Banner is visible at bottom
    const cookieBanner = page.locator('text=We respect your privacy').locator('xpath=./../..');
    await expect(cookieBanner).toBeVisible();
    
    // 2. Scroll and trigger PWA Installer manually
    await page.mouse.wheel(0, 1000);
    await page.evaluate(() => {
      const event = new Event('beforeinstallprompt');
      (event as any).userChoice = Promise.resolve({ outcome: 'dismissed' });
      (event as any).prompt = async () => {};
      window.dispatchEvent(event);
    });

    const pwaInstaller = page.getByText(/Access Luxury Living/i);
    await expect(pwaInstaller).toBeVisible({ timeout: 10000 });
    
    // 3. Find WhatsApp button
    const whatsappBtn = page.getByLabel('Contact us on WhatsApp');
    await expect(whatsappBtn).toBeVisible();

    // 4. Wait for layout transitions to stabilize
    await page.waitForTimeout(2000);

    const pwaBox = await pwaInstaller.boundingBox();
    const whatsappBox = await whatsappBtn.boundingBox();
    const cookieBox = await cookieBanner.boundingBox();

    if (cookieBox && pwaBox && whatsappBox) {
      console.log(`Cookie y: ${cookieBox.y}`);
      console.log(`PWA y: ${pwaBox.y}, bottom: ${pwaBox.y + pwaBox.height}`);
      console.log(`WhatsApp y: ${whatsappBox.y}, bottom: ${whatsappBox.y + whatsappBox.height}`);
      
      // WhatsApp should be higher than PWA (y is smaller)
      // Bottom of WhatsApp should be less than top of PWA
      expect(whatsappBox.y + whatsappBox.height).toBeLessThan(pwaBox.y);
      
      // Top of PWA should be less than top of Cookie Banner
      expect(pwaBox.y + pwaBox.height).toBeLessThan(cookieBox.y);
    }

    // 5. Close Cookie Banner and verify PWA moves down
    await page.getByTestId('cookie-accept-btn').click({ force: true });
    await expect(page.locator('text=We respect your privacy')).not.toBeVisible();
    
    // Wait for transition
    await page.waitForTimeout(2000);
    
    const pwaBoxNew = await pwaInstaller.boundingBox();
    if (pwaBoxNew && pwaBox) {
      // PWA should have moved down (y increased)
      expect(pwaBoxNew.y).toBeGreaterThan(pwaBox.y);
    }
  });
});
