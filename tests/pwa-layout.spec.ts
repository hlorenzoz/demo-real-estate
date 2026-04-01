import { test, expect } from "@playwright/test";

test.describe("PWA Installer Layout Audit", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate and wait for installer delay
    await page.goto("/en");
    // We need to wait for the scroll trigger too
    await page.evaluate(() => {
      // @ts-expect-error - window is available in browser context
      window.scrollTo(0, 500);
    });
    await page.waitForTimeout(8000); // 7s component delay + buffer
  });

  test("should stack elements vertically on small screens to prevent overlap", async ({ page }) => {
    // Set to mobile size (Pixel 2 XL equivalent width)
    await page.setViewportSize({ width: 375, height: 750 });
    
    const installer = page.getByText('Add to Home Screen');
    const installBtn = page.getByTestId('pwa-install-btn');
    
    await expect(installer).toBeVisible({ timeout: 15000 });
    await expect(installBtn).toBeVisible({ timeout: 15000 });
    
    const textBox = await installer.boundingBox();
    const btnBox = await installBtn.boundingBox();
    
    if (!textBox || !btnBox) throw new Error("Could not find bounding boxes");
    
    // In stacked layout, Install button 'y' should be significantly greater than text 'y'
    // Also, text and button should not overlap horizontally if they are in a Column
    // Or more precisely, the button top should be below the text bottom
    expect(btnBox.y).toBeGreaterThan(textBox.y + textBox.height - 5);
    
    // Check horizontal centering or width
    expect(btnBox.width).toBeGreaterThanOrEqual(textBox.width * 0.8); // Should be full-ish width on mobile
  });

  test("should align elements horizontally on larger screens", async ({ page }) => {
    // Set to desktop size
    await page.setViewportSize({ width: 1280, height: 800 });
    
    const installer = page.getByText('Add to Home Screen');
    const installBtn = page.getByTestId('pwa-install-btn');
    
    await expect(installer).toBeVisible({ timeout: 15000 });
    await expect(installBtn).toBeVisible({ timeout: 15000 });
    
    const textBox = await installer.boundingBox();
    const btnBox = await installBtn.boundingBox();
    
    if (!textBox || !btnBox) throw new Error("Could not find bounding boxes");
    
    // Check vertical alignment (should be roughly centered horizontally)
    // btn top should not be significantly below text bottom
    expect(btnBox.y + btnBox.height/2).toBeLessThanOrEqual(textBox.y + textBox.height + 10);
    expect(btnBox.y + btnBox.height/2).toBeGreaterThanOrEqual(textBox.y - 10);
    
    // Check horizontal positions (button to the right of text)
    expect(btnBox.x).toBeGreaterThan(textBox.x + textBox.width - 50); // Button is to the right
  });
});
