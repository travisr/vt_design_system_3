const { chromium } = require('playwright');
const path = require('path');

async function captureSideNav() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to demo app...');
  await page.goto('http://localhost:4200');
  
  // Wait for side nav to be visible
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  // Take full page screenshot
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  await page.screenshot({ 
    path: `sidenav-full-${timestamp}.png`, 
    fullPage: true 
  });
  console.log('Full page screenshot saved');

  // Take focused screenshot of just the sidenav
  const sidenav = await page.locator('mat-sidenav');
  await sidenav.screenshot({ 
    path: `sidenav-only-${timestamp}.png` 
  });
  console.log('Sidenav-only screenshot saved');

  // Get computed styles of sidenav elements
  const styles = await page.evaluate(() => {
    const sidenav = document.querySelector('mat-sidenav');
    const container = document.querySelector('mat-sidenav-container');
    const content = document.querySelector('mat-sidenav-content');
    const navItems = document.querySelectorAll('.nav-item, [mat-list-item], mat-list-item');
    
    const getComputedProps = (el, props) => {
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      const result = {};
      props.forEach(prop => {
        result[prop] = computed.getPropertyValue(prop);
      });
      return result;
    };

    const importantProps = [
      'background-color', 'color', 'width', 'height', 'padding', 
      'margin', 'border', 'display', 'position', 'font-size',
      'font-weight', 'border-radius', 'box-shadow'
    ];

    return {
      sidenav: sidenav ? getComputedProps(sidenav, importantProps) : null,
      container: container ? getComputedProps(container, importantProps) : null,
      content: content ? getComputedProps(content, importantProps) : null,
      firstNavItem: navItems[0] ? getComputedProps(navItems[0], importantProps) : null,
      navItemCount: navItems.length
    };
  });

  console.log('\n=== SIDENAV COMPUTED STYLES ===');
  console.log(JSON.stringify(styles, null, 2));

  // Check for visual issues
  const issues = await page.evaluate(() => {
    const problems = [];
    
    // Check sidenav visibility
    const sidenav = document.querySelector('mat-sidenav');
    if (sidenav) {
      const rect = sidenav.getBoundingClientRect();
      if (rect.width === 0) problems.push('Sidenav has 0 width');
      if (rect.height === 0) problems.push('Sidenav has 0 height');
      
      const computed = window.getComputedStyle(sidenav);
      if (computed.display === 'none') problems.push('Sidenav is display: none');
      if (computed.visibility === 'hidden') problems.push('Sidenav is hidden');
    }
    
    // Check nav items
    const navItems = document.querySelectorAll('.nav-item, [mat-list-item], mat-list-item');
    if (navItems.length === 0) {
      problems.push('No nav items found');
    } else {
      navItems.forEach((item, i) => {
        const computed = window.getComputedStyle(item);
        const rect = item.getBoundingClientRect();
        if (rect.height === 0) problems.push(`Nav item ${i} has 0 height`);
        if (!computed.backgroundColor || computed.backgroundColor === 'rgba(0, 0, 0, 0)') {
          // Check hover state
          item.dispatchEvent(new MouseEvent('mouseenter'));
          const hoverComputed = window.getComputedStyle(item);
          if (!hoverComputed.backgroundColor || hoverComputed.backgroundColor === 'rgba(0, 0, 0, 0)') {
            problems.push(`Nav item ${i} has no background color on hover`);
          }
        }
      });
    }
    
    return problems;
  });

  if (issues.length > 0) {
    console.log('\n=== DETECTED ISSUES ===');
    issues.forEach(issue => console.log(`- ${issue}`));
  } else {
    console.log('\nNo obvious visual issues detected');
  }

  // Keep browser open for manual inspection
  console.log('\nBrowser will remain open for manual inspection. Press Ctrl+C to exit.');
  await new Promise(() => {}); // Keep running
}

captureSideNav().catch(console.error);