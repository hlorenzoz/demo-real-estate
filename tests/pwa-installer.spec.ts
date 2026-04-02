import { test, expect } from "@playwright/test";

test.describe("PWA Installer E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Basic navigation
    await page.goto("/en");
    // We need to wait for the scroll trigger too
    await page.evaluate(() => {
      // @ts-expect-error - window is available in browser context
      window.scrollTo(0, 700);
    });
  });

  test("should appear after the 7 second delay and allow dismissal", async ({ page }) => {
    // Wait for the 7 second delay + buffer
    await page.waitForTimeout(10000);

    // Assert by presence in DOM 
    const installer = page.getByText('Access Luxury Living');
    await expect(installer).toBeAttached({ timeout: 15000 });

    // Verify brand assets
    const logo = page.locator('img[alt="Luxury Living logo"]');
    await expect(logo).toBeAttached();

    // Close button should work (ensure we click the visible one, desktop or mobile)
    const closeBtn = page.getByLabel("Close installer").filter({ visible: true }).first();
    await closeBtn.click();

    // Should be removed from DOM (because of AnimatePresence exit)
    await expect(installer).not.toBeAttached({ timeout: 15000 });
  });

  test("should show manual install instructions if clicked before prompt fires", async ({ page }) => {
    await page.waitForTimeout(10000);
    
    // Exact match for the button
    const installBtn = page.getByRole('button', { name: /Install/i }).first();
    await expect(installBtn).toBeAttached({ timeout: 15000 });

    // Setup dialog listener before the click
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain("To install:");
      await dialog.dismiss();
    });
    
    // Perform the interaction that triggers the blocking alert
    // dispatchEvent('click') handles blocking alerts better in CI as it doesn't wait for response
    await installBtn.dispatchEvent('click');
  });

  test("should be responsive on mobile viewports", async ({ page }) => {
    // Set to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(10000);
    
    const installer = page.getByText('Access Luxury Living');
    await expect(installer).toBeAttached({ timeout: 15000 });
    
    const box = await installer.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });
});
