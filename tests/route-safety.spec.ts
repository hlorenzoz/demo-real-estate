import { test, expect } from "@playwright/test";
import baseContent from "../base-content.json";
import { reverseMappings } from "../src/lib/routes";

const langs = ["en", "es"] as const;
const internalRoutes = [
  "listings",
  "rentals",
  "blog",
  "contact",
  "faq",
  "about-us",
  "meet-the-team",
  "privacy-policy",
  "terms-of-service",
  "cookie-policy",
  "gdpr",
  "sitemap",
] as const;

test.describe("Route & Asset Safety Checks", () => {
  // 1. Static Localized Routes
  for (const lang of langs) {
    test.describe(`Language: ${lang.toUpperCase()}`, () => {
      test("Home page should load with all required sections", async ({ page }) => {
        const response = await page.goto(`/${lang}`);
        expect(response?.status()).toBe(200);

        // Verify sections
        await expect(page.locator('#hero')).toBeVisible();
        await expect(page.locator('#featured-properties')).toBeVisible();
        await expect(page.locator('#rentals')).toBeVisible();
        await expect(page.locator('#services')).toBeVisible();
        await expect(page.locator('#about-us')).toBeVisible();
        await expect(page.locator('#reviews')).toBeVisible();
        await expect(page.locator('#faq')).toBeVisible();
        await expect(page.locator('#contact')).toBeVisible();
      });

      for (const route of internalRoutes) {
        const slug = reverseMappings[lang][route];
        test(`Route /${lang}/${slug} should load`, async ({ page }) => {
          const response = await page.goto(`/${lang}/${slug}`);
          expect(response?.status()).toBe(200);
        });
      }

      // 2. Property Detail Pages
      for (const property of baseContent.properties) {
        const listingsSlug = reverseMappings[lang]["listings"];
        test(`Property Detail /${lang}/${listingsSlug}/${property.id} should load`, async ({ page }) => {
          const response = await page.goto(`/${lang}/${listingsSlug}/${property.id}`);
          expect(response?.status()).toBe(200);
          
          // Verify main image on the page
          const mainImg = page.locator('img[priority], img[fetchpriority="high"]').first();
          await expect(mainImg).toBeVisible();
        });
      }
    });
  }

  // 3. Asset Integrity (Favicons & Public Files)
  const publicAssets = [
    "/favicon.ico",
    "/favicon.png",
    "/favicon.svg",
    "/manifest.json",
    "/robots.txt",
    "/sw.js"
  ];

  for (const asset of publicAssets) {
    test(`Public Asset ${asset} should exist (200 OK)`, async ({ request }) => {
      const response = await request.get(asset);
      expect(response.status(), `Asset ${asset} is missing!`).toBe(200);
      
      if (asset.includes("favicon")) {
        const contentType = response.headers()["content-type"];
        console.log(`Favicon ${asset} content-type: ${contentType}`);
      }
    });
  }

  // 4. Remote CDN Images (Cloudflare R2)
  const uniqueImages = Array.from(new Set(baseContent.properties.map(p => p.image)));
  for (const imgUrl of uniqueImages) {
    test(`CDN Image ${imgUrl} should be accessible`, async ({ request }) => {
      const response = await request.get(imgUrl);
      expect(response.status(), `Image ${imgUrl} returns ${response.status()}`).toBe(200);
    });
  }

  // 5. 404 Page Behavior (Unified Redirect)
  test("Unknown route /en/not-a-page should redirect to /en/404", async ({ page }) => {
    const response = await page.goto("/en/not-a-page");
    // Should follow redirect and end at /404 with status 200
    expect(page.url()).toContain("/en/404");
    expect(response?.status()).toBe(200);
    
    // Verify custom 404 content
    await expect(page.locator("h1")).toContainText(/luxurious mistake/i);
  });

  test("Unknown route /es/pagina-inexistente should redirect to /es/404", async ({ page }) => {
    const response = await page.goto("/es/pagina-inexistente");
    expect(page.url()).toContain("/es/404");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(/desvío inesperado/i);
  });
});
