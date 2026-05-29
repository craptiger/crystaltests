const { test, expect } = require('@playwright/test');

const checks = [
  {
    name: 'Wedding gifts under £50',
    url: 'https://www.crystals-online.co.uk/collections/wedding-gifts?filter.v.price.gte=0&filter.v.price.lte=50',
    minimumProducts: 10
  }
];

test.describe('Collection product count checks', () => {
  for (const check of checks) {
    test(`${check.name} has at least ${check.minimumProducts} products`, async ({ page }) => {
      await page.goto(check.url, { waitUntil: 'networkidle' });

      const products = page.locator(
        'li.grid__item, .grid__item, .product-card-wrapper, .card-wrapper'
      );

      const count = await products.count();

      expect(
        count,
        `${check.name} only has ${count} products`
      ).toBeGreaterThanOrEqual(check.minimumProducts);
    });
  }
});
