const { chromium } = require('playwright');

async function testRealHover() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  // Get second nav item (first non-active)
  const secondItem = await page.locator('a[mat-list-item]').nth(1);
  
  // Get initial background
  const initialBg = await secondItem.evaluate(el => 
    window.getComputedStyle(el).backgroundColor
  );
  
  console.log('Initial background:', initialBg);
  
  // Actually hover with mouse
  await secondItem.hover();
  await page.waitForTimeout(500); // Wait for transition
  
  // Get hover background
  const hoverBg = await secondItem.evaluate(el => 
    window.getComputedStyle(el).backgroundColor
  );
  
  console.log('Hover background:', hoverBg);
  console.log('Hover works:', initialBg !== hoverBg ? 'YES ✓' : 'NO ✗');
  
  // Take screenshot while hovering
  await page.screenshot({ path: 'hover-state.png' });
  console.log('Screenshot saved as hover-state.png');
  
  // Check CSS rule application
  const appliedStyles = await secondItem.evaluate(el => {
    const styles = window.getComputedStyle(el);
    return {
      background: styles.backgroundColor,
      hoverVar: styles.getPropertyValue('--md-sys-color-hover'),
      transition: styles.transition,
      borderRadius: styles.borderRadius
    };
  });
  
  console.log('\nApplied styles while hovering:');
  console.log(JSON.stringify(appliedStyles, null, 2));
  
  await browser.close();
}

testRealHover().catch(console.error);