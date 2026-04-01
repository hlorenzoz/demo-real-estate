import { test, expect } from '@playwright/test';

test.describe('PWA & Routing MIME Safety', () => {
  test('should return correct MIME type for sw.js in development', async ({ request }) => {
    const response = await request.get('/sw.js');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/javascript');
  });

  test('should return 404 for invalid locales instead of home page', async ({ request }) => {
    const response = await request.get('/unknown');
    // Ensure it doesn't return the home page (which has 200)
    expect(response.status()).toBe(404);
  });

  test('should return 404 for localized paths that dont exist instead of crashing', async ({ request }) => {
    const response = await request.get('/en/not-a-page');
    expect(response.status()).toBe(404);
  });
});
