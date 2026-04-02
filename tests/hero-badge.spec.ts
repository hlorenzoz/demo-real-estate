import { test, expect } from "@playwright/test";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

test.describe("Hero Badge UI", () => {
  test("Hero badge should show the requested brand colors and text", async ({ page }) => {
    // 1. Load English Home Page
    await page.goto("/en");

    // 2. Identify the badge in the Hero section
    const badge = page.locator("section.bg-primary span").filter({ hasText: /trusted real estate/i }).first();
    
    // 3. Confirm text and visibility
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText("Trusted Real Estate in your City");

    // 4. Confirm exact styles (#fece3c at runtime)
    // CSS Variables: --primary-accent: #fece3c -> rgb(254, 206, 60)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const styles = await badge.evaluate((el: any) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
      };
    });

    expect(styles.backgroundColor).toBe("rgb(254, 206, 60)");
    expect(styles.color).toBe("rgb(0, 0, 0)");
  });

  test("Hero badge should be localized", async ({ page }) => {
    // Load Spanish version
    await page.goto("/es");
    const badge = page.locator("section.bg-primary span").filter({ hasText: /inmobiliaria de confianza/i }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText("Inmobiliaria de Confianza en tu Ciudad");
  });
});
