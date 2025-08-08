const { chromium } = require('playwright');

async function verifyAllHover() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  const items = await page.locator('a[mat-list-item]').all();
  console.log(`Found ${items.length} nav items\n`);
  
  const results = [];
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // Get initial state
    const initial = await item.evaluate(el => ({
      bg: window.getComputedStyle(el).backgroundColor,
      active: el.classList.contains('active'),
      text: el.textContent.trim().substring(0, 20)
    }));
    
    // Actually hover with Playwright
    await item.hover();
    await page.waitForTimeout(100);
    
    // Get hover state
    const hover = await item.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    
    results.push({
      index: i,
      text: initial.text,
      active: initial.active,
      initialBg: initial.bg,
      hoverBg: hover,
      works: initial.bg !== hover || initial.active
    });
  }
  
  // Display results
  console.log('=== HOVER TEST RESULTS ===');
  console.log('Index | Text | Active | Initial BG | Hover BG | Status');
  console.log('------|------|--------|------------|----------|-------');
  
  results.forEach(r => {
    const status = r.works ? '✓ PASS' : '✗ FAIL';
    const active = r.active ? 'YES' : 'NO';
    console.log(`${r.index.toString().padEnd(5)} | ${r.text.padEnd(20).substring(0, 20)} | ${active.padEnd(6)} | ${r.initialBg.padEnd(20)} | ${r.hoverBg.padEnd(20)} | ${status}`);
  });
  
  const passCount = results.filter(r => r.works).length;
  console.log(`\nSUMMARY: ${passCount}/${results.length} items have working hover states`);
  
  if (passCount === results.length) {
    console.log('✓ All hover states are working correctly!');
  } else {
    console.log('✗ Some hover states are not working');
  }
  
  await browser.close();
}

verifyAllHover().catch(console.error);