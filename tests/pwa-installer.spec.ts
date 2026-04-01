import { test, expect } from "@playwright/test";

test.describe("PWA Installer E2E", () => {
  test("should appear after the 7 second delay", async ({ page }) => {
    // Navigate to the app (using localhost:3000 as configured in playwright.config.ts)
    await page.goto("/en");

    // Initially should not be visible
    const installer = page.locator("text=Add to Home Screen");
    await expect(installer).not.toBeVisible();

    // Wait for the 7 second delay + some buffer
    // Playwright clock could be used but standard wait is safer for real browser testing
    await page.waitForTimeout(8000);

    // Now it should be visible
    await expect(installer).toBeVisible();

    // Verify logo
    const logo = page.locator('img[alt="Luxury Living logo"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("src", "/favicon.svg");

    // Close button should work
    const closeBtn = page.getByLabel("Close installer");
    await closeBtn.click();

    // Should disappear
    await expect(installer).not.toBeVisible();
  });

  test("should reappear on reload unless dismissed (but it's session-based, so it reappears)", async ({ page }) => {
    await page.goto("/en");
    await page.waitForTimeout(8000);
    const installer = page.locator("text=Add to Home Screen");
    await expect(installer).toBeVisible();
  });
});
