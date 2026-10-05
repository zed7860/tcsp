import { test, expect } from '@playwright/test';
import products from '../lib/products.json';
import { productCopy } from '../lib/product-copy';

test('home contains the original logo and working navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Strong concrete.');
  const logo = page.getByRole('img', { name: 'Tumkur Concrete Spun Pipes logo' });
  await expect(logo).toBeVisible();
  expect(await logo.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  await page.getByRole('link', { name: 'View our products', exact: true }).click();
  await expect(page).toHaveURL(/\/products\/$/);
  await expect(page.locator('.product-card')).toHaveCount(12);
});

test('catalogue filters, searches and recovers from an empty result', async ({ page }) => {
  await page.goto('/products/');
  await page.getByRole('button', { name: 'Structures', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'All products', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search products' }).fill('kerb');
  await expect(page.locator('.product-card')).toHaveCount(2);
  await page.getByRole('textbox', { name: 'Search products' }).fill('nonexistent-product');
  await expect(page.getByRole('heading', { name: 'No products found' })).toBeVisible();
  await page.getByRole('button', { name: 'View all products', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(12);
});

for (const product of products) {
  test(`${product.name}: original description and local image load`, async ({ page }) => {
    const response = await page.goto(`/products/${product.slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(product.name);
    await expect(page.locator('.detail-copy')).toContainText(productCopy[product.slug].description);
    expect(await page.locator('.detail-image img').evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
    await expect(page.getByRole('link', { name: 'Enquire about this product' })).toHaveAttribute('href', `/contact/?product=${product.slug}`);
  });
}

test('contact validates fields and securely submits the enquiry', async ({ page }) => {
  let submitted: Record<string, string> = {};
  await page.route('**/api/enquiry', async route => {
    submitted = route.request().postDataJSON() as Record<string, string>;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ message: 'Your enquiry has been sent.' }) });
  });
  await page.goto('/contact/?product=industrial-rcc-hume-pipe');
  await expect(page.getByRole('combobox', { name: 'Product needed' })).toHaveValue('Industrial RCC Hume Pipe');
  await page.getByRole('button', { name: 'Submit enquiry' }).click();
  await expect(page.getByRole('textbox', { name: 'Your name' })).toBeFocused();
  await page.getByRole('textbox', { name: 'Your name' }).fill('Test Customer');
  await page.getByRole('textbox', { name: 'Phone number' }).fill('9876543210');
  await page.getByRole('textbox', { name: 'Email address' }).fill('customer@example.com');
  await page.getByRole('textbox', { name: 'Tell us your requirement' }).fill('Please quote for 20 RCC pipes.');
  await page.getByRole('button', { name: 'Submit enquiry' }).click();
  await expect(page.getByRole('status')).toContainText('connect with you shortly');
  expect(submitted).toMatchObject({ name: 'Test Customer', phone: '9876543210', email: 'customer@example.com', product: 'Industrial RCC Hume Pipe', message: 'Please quote for 20 RCC pipes.' });
});

test('header enquiry opens as a modal and theme control works', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Let’s talk' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tell us what you need.' })).toBeVisible();
  await page.getByRole('button', { name: 'Close enquiry form' }).click();
  await page.getByRole('button', { name: /dark mode|light mode/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', /dark|light/);
  await expect(page.getByRole('combobox', { name: 'Select language' })).toContainText('ಕನ್ನಡ');
});

test('mobile menu, all primary pages and product page fit the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About us' }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  for (const route of ['/', '/about/', '/products/', '/our-works/', '/blog/', '/contact/', `/products/${products[0].slug}/`]) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBeTruthy();
  }
});

test('blog links to Instagram and layouts align across common device widths', async ({ page }) => {
  test.setTimeout(60000);
  await page.route('**/translate.google.com/**', route => route.abort());
  await page.goto('/blog/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Latest from our factory');
  await expect(page.getByRole('link', { name: /View Instagram|View public profile/ }).first()).toHaveAttribute('href', 'https://www.instagram.com/tumkurconcretespunpipe/');
  for (const width of [320, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/about/', '/products/', '/blog/', '/contact/']) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route} at ${width}px`).toBeTruthy();
      const header = await page.locator('.header-inner').boundingBox();
      expect(header, `header on ${route} at ${width}px`).not.toBeNull();
      expect(header!.x).toBeGreaterThanOrEqual(0);
      expect(header!.x + header!.width).toBeLessThanOrEqual(width + 1);
    }
  }
});

test('works preserves coming soon; missing pages have a recovery link', async ({ page }) => {
  await page.goto('/our-works/');
  await expect(page.getByRole('heading', { name: 'Coming soon.' })).toBeVisible();
  await page.goto('/does-not-exist/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('solid ground');
  await expect(page.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
});
