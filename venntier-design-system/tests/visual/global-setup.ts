import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Wait for the application to be ready
  await page.goto('http://localhost:4200');
  await page.waitForSelector('app-root', { timeout: 30000 });

  // Wait for any initial animations or loading to complete
  await page.waitForTimeout(2000);

  await browser.close();
}

export default globalSetup;
