const { chromium } = require('playwright');

async function testNewHover() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  // Test a non-active item
  const item = await page.locator('a[mat-list-item]').nth(2);
  
  // Hover with real mouse
  await item.hover();
  await page.waitForTimeout(300);
  
  // Get colors
  const colors = await page.evaluate(() => {
    const nav = document.querySelector('mat-sidenav');
    const hoveredItem = document.querySelector('a[mat-list-item]:nth-child(3)');
    const root = window.getComputedStyle(document.documentElement);
    
    return {
      navBg: window.getComputedStyle(nav).backgroundColor,
      itemBg: window.getComputedStyle(hoveredItem).backgroundColor,
      hoverToken: root.getPropertyValue('--md-sys-color-hover'),
      selectedToken: root.getPropertyValue('--md-sys-color-selected')
    };
  });
  
  console.log('=== HOVER TEST RESULTS ===');
  console.log('Nav background:', colors.navBg);
  console.log('Item background (while hovering):', colors.itemBg);
  console.log('--md-sys-color-hover:', colors.hoverToken);
  console.log('--md-sys-color-selected:', colors.selectedToken);
  
  // Take screenshot
  await page.screenshot({ path: 'hover-test-new.png' });
  console.log('\nScreenshot saved as hover-test-new.png');
  
  console.log('\nKeeping browser open for manual testing...');
  console.log('Try hovering over different nav items.');
  await new Promise(() => {});
}

testNewHover().catch(console.error);