const { chromium } = require('playwright');

async function verifySidenav() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to demo app...');
  await page.goto('http://localhost:4200');
  
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  // Screenshot
  await page.screenshot({ path: `sidenav-final-${Date.now()}.png`, fullPage: true });
  
  // Get all nav items and test each
  const results = await page.evaluate(() => {
    const items = document.querySelectorAll('a[mat-list-item]');
    const tests = [];
    
    items.forEach((item, i) => {
      const styles = window.getComputedStyle(item);
      const isActive = item.classList.contains('active');
      
      // Simulate hover
      const event = new MouseEvent('mouseenter', { bubbles: true });
      item.dispatchEvent(event);
      const hoverStyles = window.getComputedStyle(item);
      
      tests.push({
        index: i,
        text: item.textContent.trim(),
        isActive,
        normalBg: styles.backgroundColor,
        hoverBg: hoverStyles.backgroundColor,
        hoverWorks: styles.backgroundColor !== hoverStyles.backgroundColor || isActive
      });
    });
    
    return tests;
  });
  
  console.log('\n=== SIDENAV VERIFICATION ===');
  console.log('Item | Text | Active | Normal BG | Hover BG | Works?');
  console.log('-----|------|--------|-----------|----------|-------');
  
  results.forEach(r => {
    console.log(`${r.index} | ${r.text.substring(0, 10)} | ${r.isActive ? 'YES' : 'NO'} | ${r.normalBg} | ${r.hoverBg} | ${r.hoverWorks ? '✓' : '✗'}`);
  });
  
  const passCount = results.filter(r => r.hoverWorks).length;
  console.log(`\nPASSED: ${passCount}/${results.length} items have working hover states`);
  
  console.log('\nBrowser will remain open. Press Ctrl+C to exit.');
  await new Promise(() => {});
}

verifySidenav().catch(console.error);