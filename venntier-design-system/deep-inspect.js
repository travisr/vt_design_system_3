const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('.mat-drawer-content', { timeout: 5000 });
  
  // Deep inspect mat-drawer-content box model
  const analysis = await page.evaluate(() => {
    const el = document.querySelector('.mat-drawer-content');
    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    
    // Check for any inline styles
    const inlineStyles = el.getAttribute('style');
    
    // Get actual padding values
    const paddingValues = {
      top: computed.paddingTop,
      right: computed.paddingRight,
      bottom: computed.paddingBottom,
      left: computed.paddingLeft,
      // Check shorthand
      padding: computed.padding
    };
    
    // Check CSS rules that apply to this element
    const sheets = Array.from(document.styleSheets);
    const matchingRules = [];
    
    sheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule.selectorText && el.matches(rule.selectorText)) {
            if (rule.style.padding || rule.style.paddingTop) {
              matchingRules.push({
                selector: rule.selectorText,
                padding: rule.style.padding,
                paddingTop: rule.style.paddingTop,
                important: rule.style.getPropertyPriority('padding') || 
                           rule.style.getPropertyPriority('padding-top')
              });
            }
          }
        });
      } catch (e) {
        // Cross-origin or other access issues
      }
    });
    
    // Check the first child's position
    const firstChild = el.firstElementChild;
    const firstChildRect = firstChild ? firstChild.getBoundingClientRect() : null;
    
    return {
      inlineStyles,
      paddingValues,
      matchingRules,
      elementTop: rect.top,
      firstChildTop: firstChildRect ? firstChildRect.top : null,
      gap: firstChildRect ? (firstChildRect.top - rect.top) : null
    };
  });
  
  console.log('\n=== DEEP ANALYSIS ===');
  console.log('Inline styles:', analysis.inlineStyles || 'none');
  console.log('\nPadding values:');
  Object.entries(analysis.paddingValues).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  
  console.log('\nMatching CSS rules:');
  if (analysis.matchingRules.length > 0) {
    analysis.matchingRules.forEach(rule => {
      console.log(`  ${rule.selector}:`);
      console.log(`    padding: ${rule.padding || 'not set'}`);
      console.log(`    padding-top: ${rule.paddingTop || 'not set'}`);
      console.log(`    important: ${rule.important || 'no'}`);
    });
  } else {
    console.log('  No padding rules found');
  }
  
  console.log('\nBox model:');
  console.log(`  Element top: ${analysis.elementTop}px`);
  console.log(`  First child top: ${analysis.firstChildTop}px`);
  console.log(`  Gap: ${analysis.gap}px`);
  
  // Now check Angular Material's internal styles
  const matStyles = await page.evaluate(() => {
    const el = document.querySelector('.mat-drawer-content');
    // Try to access Angular Material's internal properties
    const angularEl = el;
    
    // Check for ViewEncapsulation attributes
    const ngAttributes = Array.from(el.attributes)
      .filter(attr => attr.name.startsWith('_ng'))
      .map(attr => attr.name);
    
    return {
      ngAttributes,
      classList: Array.from(el.classList)
    };
  });
  
  console.log('\n=== ANGULAR INTERNAL ===');
  console.log('ViewEncapsulation attributes:', matStyles.ngAttributes);
  console.log('Classes:', matStyles.classList);
  
  await browser.close();
})();