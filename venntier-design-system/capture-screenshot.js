const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to standard desktop size
  await page.setViewportSize({ width: 1280, height: 800 });
  
  // Navigate to the demo app
  await page.goto('http://localhost:4200');
  
  // Wait for content to load
  await page.waitForSelector('mat-card', { timeout: 5000 });
  
  // Take screenshot of current state
  await page.screenshot({ 
    path: 'current-demo-screenshot.png',
    fullPage: true 
  });
  
  // Click dark mode toggle
  await page.click('button[mattooltip="Toggle theme"]');
  await page.waitForTimeout(500);
  
  // Take dark mode screenshot
  await page.screenshot({ 
    path: 'current-demo-dark-screenshot.png',
    fullPage: true 
  });
  
  await browser.close();
  console.log('Screenshots captured successfully');
})();