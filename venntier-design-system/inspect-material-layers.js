const { chromium } = require('playwright');

async function inspectMaterialLayers() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  // Check the structure of a list item
  const structure = await page.evaluate(() => {
    const item = document.querySelector('a[mat-list-item]:not(.active)');
    if (!item) return null;
    
    // Get all child elements
    const children = Array.from(item.children).map(child => ({
      tag: child.tagName,
      classes: Array.from(child.classList),
      hasRipple: child.classList.contains('mat-ripple') || child.classList.contains('mdc-list-item__ripple')
    }));
    
    // Check for ::before pseudo-element
    const itemStyles = window.getComputedStyle(item);
    const beforeStyles = window.getComputedStyle(item, '::before');
    
    return {
      itemClasses: Array.from(item.classList),
      children,
      itemBg: itemStyles.backgroundColor,
      beforeContent: beforeStyles.content,
      beforeBg: beforeStyles.backgroundColor,
      beforeOpacity: beforeStyles.opacity,
      beforePosition: beforeStyles.position,
      beforeZIndex: beforeStyles.zIndex
    };
  });
  
  console.log('List item structure:', JSON.stringify(structure, null, 2));
  
  // Now hover and check what changes
  const secondItem = await page.locator('a[mat-list-item]:not(.active)').first();
  await secondItem.hover();
  await page.waitForTimeout(200);
  
  const hoverState = await secondItem.evaluate(el => {
    const styles = window.getComputedStyle(el);
    const before = window.getComputedStyle(el, '::before');
    
    // Check all background-related properties
    return {
      bg: styles.backgroundColor,
      bgImage: styles.backgroundImage,
      beforeBg: before.backgroundColor,
      beforeOpacity: before.opacity,
      beforeDisplay: before.display,
      beforePointerEvents: before.pointerEvents
    };
  });
  
  console.log('\nHover state:', JSON.stringify(hoverState, null, 2));
  
  await browser.close();
}

inspectMaterialLayers().catch(console.error);