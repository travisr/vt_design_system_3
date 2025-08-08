const { chromium } = require('playwright');

async function checkHoverOpacity() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  // Get the CSS variable value
  const cssVar = await page.evaluate(() => {
    const computed = window.getComputedStyle(document.documentElement);
    return computed.getPropertyValue('--md-sys-color-hover');
  });
  
  console.log('CSS Variable --md-sys-color-hover:', cssVar);
  
  // Test on second item (non-active)
  const item = await page.locator('a[mat-list-item]:not(.active)').first();
  
  // Hover
  await item.hover();
  await page.waitForTimeout(200);
  
  // Get detailed styles
  const styles = await item.evaluate(el => {
    const computed = window.getComputedStyle(el);
    
    // Convert rgba to hex if needed
    const rgba = computed.backgroundColor;
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    
    return {
      backgroundColor: computed.backgroundColor,
      backgroundImage: computed.backgroundImage,
      opacity: computed.opacity,
      mixBlendMode: computed.mixBlendMode,
      rgbaMatch: match ? {
        r: match[1],
        g: match[2], 
        b: match[3],
        a: match[4] || '1'
      } : null
    };
  });
  
  console.log('\nHover styles:', JSON.stringify(styles, null, 2));
  
  // Check if there are overlapping elements
  const overlap = await item.evaluate(el => {
    const rect = el.getBoundingClientRect();
    const elements = document.elementsFromPoint(rect.left + 10, rect.top + 10);
    return elements.map(e => ({
      tag: e.tagName,
      classes: Array.from(e.classList),
      bg: window.getComputedStyle(e).backgroundColor
    }));
  });
  
  console.log('\nElements at hover point:', JSON.stringify(overlap.slice(0, 5), null, 2));
  
  await browser.close();
}

checkHoverOpacity().catch(console.error);