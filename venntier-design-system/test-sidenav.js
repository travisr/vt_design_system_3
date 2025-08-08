const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to the demo app
  await page.goto('http://localhost:4200');
  
  // Wait for the sidenav to be visible
  await page.waitForSelector('mat-sidenav', { timeout: 5000 });
  
  // Get the computed styles for different states
  console.log('=== SIDENAV COLOR ANALYSIS ===\n');
  
  // Get background color of sidenav
  const sidenavBg = await page.evaluate(() => {
    const sidenav = document.querySelector('mat-sidenav');
    return window.getComputedStyle(sidenav).backgroundColor;
  });
  console.log('Sidenav Background:', sidenavBg);
  
  // Get all nav items
  const navItems = await page.$$('mat-sidenav a[mat-list-item]');
  
  if (navItems.length > 0) {
    // Check first item default state
    const defaultBg = await navItems[0].evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    console.log('Nav Item Default Background:', defaultBg);
    
    // Hover over first item
    await navItems[0].hover();
    await page.waitForTimeout(200);
    
    const hoverBg = await navItems[0].evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    console.log('Nav Item Hover Background:', hoverBg);
    
    // Click to make active
    await navItems[0].click();
    await page.waitForTimeout(200);
    
    const activeBg = await navItems[0].evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    console.log('Nav Item Active Background:', activeBg);
    
    // Check if item has active class
    const hasActiveClass = await navItems[0].evaluate(el => 
      el.classList.contains('active')
    );
    console.log('Has .active class:', hasActiveClass);
    
    // Get CSS variable values
    console.log('\n=== CSS VARIABLE VALUES ===\n');
    const cssVars = await page.evaluate(() => {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      return {
        background: style.getPropertyValue('--md-sys-color-background'),
        hover: style.getPropertyValue('--md-sys-color-hover'),
        selected: style.getPropertyValue('--md-sys-color-selected'),
        surfaceContainerLow: style.getPropertyValue('--md-sys-color-surface-container-low'),
        surfaceContainerHigh: style.getPropertyValue('--md-sys-color-surface-container-high'),
      };
    });
    
    console.log('--md-sys-color-background:', cssVars.background);
    console.log('--md-sys-color-hover:', cssVars.hover);
    console.log('--md-sys-color-selected:', cssVars.selected);
    console.log('--md-sys-color-surface-container-low:', cssVars.surfaceContainerLow);
    console.log('--md-sys-color-surface-container-high:', cssVars.surfaceContainerHigh);
  }
  
  // Take a screenshot
  await page.screenshot({ path: 'sidenav-test.png', fullPage: true });
  console.log('\nScreenshot saved as sidenav-test.png');
  
  // Keep browser open for manual inspection
  console.log('\nBrowser will stay open for inspection. Press Ctrl+C to exit.');
  
  // Keep the script running
  await new Promise(() => {});
})();