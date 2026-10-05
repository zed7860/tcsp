import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'source-reference/preview-desktop.png', fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: 'source-reference/preview-mobile.png', fullPage: true });
await browser.close();
