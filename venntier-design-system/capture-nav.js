const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4200');
  
  // Wait for navigation to load
  await page.waitForSelector('.vt-nav-section');
  
  // Find and screenshot the Navigation section
  const navSection = await page.locator('.vt-nav-section:has-text("Navigation")');
  await navSection.screenshot({ path: 'navigation-section.png' });
  
  console.log('Navigation section screenshot saved as navigation-section.png');
  
  await browser.close();
})();