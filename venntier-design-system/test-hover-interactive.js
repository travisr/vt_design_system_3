const { chromium } = require('playwright');

async function testHoverInteractive() {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  console.log('Testing hover on multiple nav items...\n');
  
  // Test first 5 nav items
  for (let i = 0; i < 5; i++) {
    const item = await page.locator('a[mat-list-item]').nth(i);
    
    // Get initial state
    const initialState = await item.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        bg: styles.backgroundColor,
        isActive: el.classList.contains('active')
      };
    });
    
    // Hover
    await item.hover();
    await page.waitForTimeout(200);
    
    // Get hover state
    const hoverState = await item.evaluate(el => {
      const styles = window.getComputedStyle(el);
      // Also check pseudo-element
      const before = window.getComputedStyle(el, '::before');
      return {
        bg: styles.backgroundColor,
        beforeBg: before.backgroundColor,
        beforeContent: before.content,
        opacity: before.opacity
      };
    });
    
    console.log(`Item ${i}:`);
    console.log(`  Active: ${initialState.isActive}`);
    console.log(`  Initial BG: ${initialState.bg}`);
    console.log(`  Hover BG: ${hoverState.bg}`);
    console.log(`  ::before BG: ${hoverState.beforeBg}`);
    console.log(`  Works: ${initialState.bg !== hoverState.bg ? '✓' : '✗'}`);
    console.log('');
    
    // Move away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);
  }
  
  console.log('\nKeeping browser open for manual testing...');
  console.log('Try hovering over nav items manually.');
  console.log('Press Ctrl+C to exit.');
  
  // Keep open
  await new Promise(() => {});
}

testHoverInteractive().catch(console.error);