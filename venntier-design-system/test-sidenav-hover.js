const { chromium } = require('playwright');

async function testSidenavHover() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to demo app...');
  await page.goto('http://localhost:4200');
  
  // Wait for sidenav
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  // Test hover states on nav items
  const navItems = await page.$$('mat-list-item, a[mat-list-item], .mat-mdc-list-item');
  console.log(`Found ${navItems.length} nav items`);
  
  for (let i = 0; i < Math.min(3, navItems.length); i++) {
    const item = navItems[i];
    
    // Get initial background
    const initialBg = await item.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Hover over item
    await item.hover();
    await page.waitForTimeout(100);
    
    // Get hover background
    const hoverBg = await item.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    console.log(`Item ${i}:`);
    console.log(`  Initial: ${initialBg}`);
    console.log(`  Hover: ${hoverBg}`);
    console.log(`  Changed: ${initialBg !== hoverBg ? 'YES ✓' : 'NO ✗'}`);
  }
  
  // Check CSS variables
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const computed = window.getComputedStyle(root);
    return {
      hover: computed.getPropertyValue('--md-sys-color-hover'),
      selected: computed.getPropertyValue('--md-sys-color-selected'),
      surface: computed.getPropertyValue('--md-sys-color-surface'),
      onSurface: computed.getPropertyValue('--md-sys-color-on-surface')
    };
  });
  
  console.log('\nCSS Variables:');
  console.log(JSON.stringify(cssVars, null, 2));
  
  await browser.close();
}

testSidenavHover().catch(console.error);