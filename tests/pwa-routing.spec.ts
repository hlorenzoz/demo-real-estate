import { test, expect } from '@playwright/test';

test.describe('PWA & Routing MIME Safety', () => {
  test('should return correct MIME type for sw.js in development', async ({ request }) => {
    const response = await request.get('/sw.js');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/javascript');
  });

  test('should return 404 behavior for invalid locales (redirect to /en/404)', async ({ request }) => {
    const response = await request.get('/unknown');
    // Ensure it follows redirect and lands on a page
    expect(response.status()).toBe(200);
    expect(response.url()).toMatch(/\/(en|es)\/404/);
  });

  test('should return 404 behavior for localized paths that dont exist (redirect to /[lang]/404)', async ({ request }) => {
    const response = await request.get('/en/not-a-page');
    expect(response.status()).toBe(200);
    expect(response.url()).toContain('/en/404');
  });
});
