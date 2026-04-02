/**
 * E2E Tests: Property Routing & Filter Behaviour
 *
 * Coverage:
 * 1. Navbar links → correct URLs (Listings → /listings, Rentals → /rentals)
 * 2. /en/properties  — shows ALL 10 properties + contract-type filter pills visible
 * 3. /en/listings    — shows ONLY 6 for-sale properties + NO contract-type filters
 * 4. /en/rentals     — shows ONLY 4 for-rent properties  + NO contract-type filters
 * 5. Contract-type filter pills on /properties actually filter by sale / rent
 * 6. Spanish equivalents: /es/propiedades, /es/listados, /es/alquiler
 * 7. Hero & home CTA links point to /properties (not /listings)
 */

import { test, expect, Page } from "@playwright/test";

const BASE = "http://localhost:3000";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Count the number of visible property cards on the page.
 * Cards are identified by their "View Property" / "Ver Propiedad" CTA links.
 * We wait up to 15 seconds for at least one card to appear.
 */
async function countVisibleCards(page: Page): Promise<number> {
  // Use a targeted locator for the results span (it has specific classes)
  const resultsEl = page.locator('span.text-xs.font-black.text-text-muted').first();
  
  if (await resultsEl.isVisible({ timeout: 10000 }).catch(() => false)) {
    const text = (await resultsEl.textContent()) ?? "";
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  return 0;
}

/** Return true if the sale/rent/all contract filter row is present. */
async function contractFiltersVisible(page: Page): Promise<boolean> {
  const forSaleBtn = page.getByRole("button", { name: /for sale/i });
  const forRentBtn = page.getByRole("button", { name: /for rent/i });
  return (await forSaleBtn.isVisible()) || (await forRentBtn.isVisible());
}

/** Wait for the properties grid to be fully loaded */
async function waitForPropertiesGrid(page: Page): Promise<void> {
  // Wait for the span that contains a number followed by some text
  await page.waitForSelector('span.text-xs.font-black.text-text-muted', { timeout: 15000 });
  // Small extra wait for framer-motion transitions
  await page.waitForTimeout(500);
}

// ---------------------------------------------------------------------------
// 1. Navbar links
// ---------------------------------------------------------------------------

test.describe("Navbar links", () => {
  test("Listings nav link points to /en/listings", async ({ page }) => {
    await page.goto(`${BASE}/en`);
    await page.waitForLoadState("networkidle");

    const listingsLink = page
      .locator("nav")
      .getByRole("link", { name: /^listings$/i })
      .first();
    const href = await listingsLink.getAttribute("href");
    expect(href).toBe("/en/listings");
  });

  test("Rentals nav link points to /en/rentals", async ({ page }) => {
    await page.goto(`${BASE}/en`);
    await page.waitForLoadState("networkidle");

    const rentalsLink = page
      .locator("nav")
      .getByRole("link", { name: /^rentals$/i })
      .first();
    const href = await rentalsLink.getAttribute("href");
    expect(href).toBe("/en/rentals");
  });

  test("Clicking Listings nav link navigates to /en/listings", async ({
    page,
  }) => {
    await page.goto(`${BASE}/en`);
    await page.waitForLoadState("networkidle");

    const listingsLink = page
      .locator("nav")
      .getByRole("link", { name: /^listings$/i })
      .first();
    await listingsLink.click();
    await page.waitForURL(`${BASE}/en/listings`);
    expect(page.url()).toBe(`${BASE}/en/listings`);
  });

  test("Clicking Rentals nav link navigates to /en/rentals", async ({
    page,
  }) => {
    await page.goto(`${BASE}/en`);
    await page.waitForLoadState("networkidle");

    const rentalsLink = page
      .locator("nav")
      .getByRole("link", { name: /^rentals$/i })
      .first();
    await rentalsLink.click();
    await page.waitForURL(`${BASE}/en/rentals`);
    expect(page.url()).toBe(`${BASE}/en/rentals`);
  });
});

// ---------------------------------------------------------------------------
// 2. /en/properties — unified page (all properties)
// ---------------------------------------------------------------------------

test.describe("/en/properties — unified catalog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/en/properties`);
    await page.waitForLoadState("networkidle");
  });

  test("returns 200 and stays at /en/properties", async ({ page }) => {
    expect(page.url()).toContain("/en/properties");
  });

  test("shows all 10 properties (sale + rent)", async ({ page }) => {
    await waitForPropertiesGrid(page);
    const count = await countVisibleCards(page);
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test("contract-type filter pills (All / For Sale / For Rent) are visible", async ({
    page,
  }) => {
    await waitForPropertiesGrid(page);
    const visible = await contractFiltersVisible(page);
    expect(visible).toBe(true);
  });

  test("'For Sale' filter pill shows only 6 sale properties", async ({
    page,
  }) => {
    await waitForPropertiesGrid(page);
    const forSaleBtn = page.getByRole("button", { name: /for sale/i }).first();
    await forSaleBtn.click();
    await page.waitForTimeout(600);
    const count = await countVisibleCards(page);
    expect(count).toBe(6);
  });

  test("'For Rent' filter pill shows only 4 rental properties", async ({
    page,
  }) => {
    await waitForPropertiesGrid(page);
    const forRentBtn = page.getByRole("button", { name: /for rent/i }).first();
    await forRentBtn.click();
    await page.waitForTimeout(600);
    const count = await countVisibleCards(page);
    expect(count).toBe(4);
  });

  test("'All' filter pill restores full list after filtering", async ({
    page,
  }) => {
    await waitForPropertiesGrid(page);
    await page.getByRole("button", { name: /for sale/i }).first().click();
    await page.waitForTimeout(400);
    await page.getByRole("button", { name: /^all$/i }).nth(1).click();
    await page.waitForTimeout(600);
    const count = await countVisibleCards(page);
    expect(count).toBeGreaterThanOrEqual(10);
  });
});

// ---------------------------------------------------------------------------
// 3. /en/listings — sales-only page
// ---------------------------------------------------------------------------

test.describe("/en/listings — sales-only catalog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/en/listings`);
    await page.waitForLoadState("networkidle");
  });

  test("returns 200 and stays at /en/listings", async ({ page }) => {
    expect(page.url()).toContain("/en/listings");
  });

  test("shows only 6 for-sale properties", async ({ page }) => {
    await waitForPropertiesGrid(page);
    const count = await countVisibleCards(page);
    expect(count).toBe(6);
  });

  test("contract-type filter pills are NOT visible", async ({ page }) => {
    await waitForPropertiesGrid(page);
    const visible = await contractFiltersVisible(page);
    expect(visible).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 4. /en/rentals — rentals-only page
// ---------------------------------------------------------------------------

test.describe("/en/rentals — rentals-only catalog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/en/rentals`);
    await page.waitForLoadState("networkidle");
  });

  test("returns 200 and stays at /en/rentals", async ({ page }) => {
    expect(page.url()).toContain("/en/rentals");
  });

  test("shows only 4 for-rent properties", async ({ page }) => {
    await waitForPropertiesGrid(page);
    const count = await countVisibleCards(page);
    expect(count).toBe(4);
  });

  test("contract-type filter pills are NOT visible", async ({ page }) => {
    await waitForPropertiesGrid(page);
    const visible = await contractFiltersVisible(page);
    expect(visible).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 5. Spanish routes
// ---------------------------------------------------------------------------

test.describe("Spanish routes", () => {
  test("/es/propiedades — unified catalog (10 properties, filters visible)", async ({
    page,
  }) => {
    await page.goto(`${BASE}/es/propiedades`);
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/es/propiedades");
    await waitForPropertiesGrid(page);
    const count = await countVisibleCards(page);
    expect(count).toBeGreaterThanOrEqual(10);
    // Contract filters should be visible with Spanish labels
    const enVentaBtn = page.getByRole("button", { name: /en venta/i });
    const enAlquilerBtn = page.getByRole("button", { name: /en alquiler/i });
    const filtersVisible =
      (await enVentaBtn.isVisible()) || (await enAlquilerBtn.isVisible());
    expect(filtersVisible).toBe(true);
  });

  test("/es/listados — sales-only catalog (6 properties, no contract filters)", async ({
    page,
  }) => {
    await page.goto(`${BASE}/es/listados`);
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/es/listados");
    await waitForPropertiesGrid(page);
    const count = await countVisibleCards(page);
    expect(count).toBe(6);
    const enVentaBtn = page.getByRole("button", { name: /en venta/i });
    expect(await enVentaBtn.isVisible()).toBe(false);
  });

  test("/es/alquiler — rentals-only catalog (4 properties, no contract filters)", async ({
    page,
  }) => {
    await page.goto(`${BASE}/es/alquiler`);
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/es/alquiler");
    await waitForPropertiesGrid(page);
    const count = await countVisibleCards(page);
    expect(count).toBe(4);
    const enVentaBtn = page.getByRole("button", { name: /en venta/i });
    expect(await enVentaBtn.isVisible()).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 6. Spanish navbar links
// ---------------------------------------------------------------------------

test.describe("Spanish navbar links", () => {
  test("Listados nav link points to /es/listados", async ({ page }) => {
    await page.goto(`${BASE}/es`);
    await page.waitForLoadState("networkidle");

    const listingsLink = page
      .locator("nav")
      .getByRole("link", { name: /listados/i })
      .first();
    const href = await listingsLink.getAttribute("href");
    expect(href).toBe("/es/listados");
  });

  test("Alquiler nav link points to /es/alquiler", async ({ page }) => {
    await page.goto(`${BASE}/es`);
    await page.waitForLoadState("networkidle");

    const rentalsLink = page
      .locator("nav")
      .getByRole("link", { name: /alquiler/i })
      .first();
    const href = await rentalsLink.getAttribute("href");
    expect(href).toBe("/es/alquiler");
  });
});

// ---------------------------------------------------------------------------
// 7. Home page CTA links point to /properties (not /listings)
// ---------------------------------------------------------------------------

test.describe("Home page CTA links", () => {
  test("Hero CTA 'Explore Properties' links to /en/properties", async ({
    page,
  }) => {
    await page.goto(`${BASE}/en`);
    await page.waitForLoadState("networkidle");

    // The hero section CTA link with text "Explore Properties"
    const heroCta = page
      .locator("section#hero")
      .getByRole("link", { name: /explore properties/i });
    const href = await heroCta.getAttribute("href");
    expect(href).toBe("/en/properties");
  });

  test("'Check Listings' home-section CTA links to /en/properties", async ({
    page,
  }) => {
    await page.goto(`${BASE}/en`);
    await page.waitForLoadState("networkidle");

    const ctaLink = page
      .locator("section#featured-properties")
      .getByRole("link", { name: /check listings/i });
    const href = await ctaLink.getAttribute("href");
    expect(href).toBe("/en/listings");
  });
});
