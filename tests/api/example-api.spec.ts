import { test, expect } from '@playwright/test';

test.describe('API Example Tests', () => {
  test('GET / returns a successful response', async ({ request }) => {
    const response = await request.get('/');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBeLessThan(400);
  });

  test('response includes content-type header', async ({ request }) => {
    const response = await request.get('/');
    expect(response.headers()['content-type']).toBeDefined();
  });

  test('unknown endpoint returns 4xx', async ({ request }) => {
    const response = await request.get('/nonexistent-api-endpoint-xyz');
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});