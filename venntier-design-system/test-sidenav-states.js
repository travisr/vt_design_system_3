const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to the demo app
  await page.goto('http://localhost:4200');
  
  // Wait for the sidenav to be visible
  await page.waitForSelector('mat-sidenav', { timeout: 5000 });
  
  console.log('=== SIDENAV STATE TESTING ===\n');
  
  // Get all nav items
  const navItems = await page.$$('mat-sidenav a[mat-list-item]');
  
  if (navItems.length >= 2) {
    // Test the second item (first might be active by default)
    const testItem = navItems[1];
    
    // Check initial state
    const initialBg = await testItem.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    const isInitiallyActive = await testItem.evaluate(el => 
      el.classList.contains('active')
    );
    console.log('Item 2 Initial State:');
    console.log('  Background:', initialBg);
    console.log('  Has active class:', isInitiallyActive);
    
    // Test hover state
    await testItem.hover();
    await page.waitForTimeout(300);
    
    const hoverBg = await testItem.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    console.log('\nItem 2 Hover State:');
    console.log('  Background:', hoverBg);
    
    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
    
    const afterHoverBg = await testItem.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    console.log('\nItem 2 After Hover:');
    console.log('  Background:', afterHoverBg);
    
    // Check the first item if it's active
    const firstItemBg = await navItems[0].evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    const isFirstActive = await navItems[0].evaluate(el => 
      el.classList.contains('active')
    );
    console.log('\nItem 1 (possibly active):');
    console.log('  Background:', firstItemBg);
    console.log('  Has active class:', isFirstActive);
    
    // Check applied styles
    console.log('\n=== COMPUTED STYLES DEBUG ===\n');
    const appliedStyles = await testItem.evaluate(el => {
      const styles = window.getComputedStyle(el);
      // Check for any inline styles or overrides
      return {
        backgroundColor: styles.backgroundColor,
        transition: styles.transition,
        borderRadius: styles.borderRadius,
        hasInlineStyle: el.style.backgroundColor !== '',
        classList: Array.from(el.classList)
      };
    });
    console.log('Applied styles on nav item:', appliedStyles);
    
    // Check sidenav background
    const sidenavBg = await page.evaluate(() => {
      const sidenav = document.querySelector('mat-sidenav');
      return window.getComputedStyle(sidenav).backgroundColor;
    });
    console.log('\nSidenav background:', sidenavBg);
    
    // Color comparison
    console.log('\n=== COLOR COMPARISON ===');
    console.log('Expected background: #fafafa (250, 250, 250)');
    console.log('Expected hover: #f7f7f8 (247, 247, 248)');
    console.log('Expected active: #ececf1 (236, 236, 241)');
    console.log('\nActual sidenav bg:', sidenavBg);
    console.log('Actual item bg:', initialBg);
    console.log('Actual hover bg:', hoverBg);
  }
  
  // Take a screenshot
  await page.screenshot({ path: 'sidenav-states.png', fullPage: true });
  console.log('\nScreenshot saved as sidenav-states.png');
  
  await browser.close();
})();