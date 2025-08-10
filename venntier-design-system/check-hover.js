const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:4200');
  await page.waitForSelector('button[mat-icon-button]');
  
  const iconButton = await page.$('button[mat-icon-button]');
  
  // Get button dimensions and position
  const normalState = await iconButton.evaluate(el => {
    const rect = el.getBoundingClientRect();
    const computed = window.getComputedStyle(el);
    const icon = el.querySelector('.mat-icon');
    const iconRect = icon ? icon.getBoundingClientRect() : null;
    
    return {
      button: {
        width: rect.width,
        height: rect.height,
        padding: computed.padding,
        classes: el.className
      },
      icon: iconRect ? {
        width: iconRect.width,
        height: iconRect.height,
        top: iconRect.top - rect.top,
        left: iconRect.left - rect.left
      } : null
    };
  });
  
  // Hover and check state layer
  await iconButton.hover();
  await page.waitForTimeout(100);
  
  const hoverState = await iconButton.evaluate(el => {
    // Find the actual hover overlay element
    const ripple = el.querySelector('.mdc-icon-button__ripple');
    const stateLayer = el.querySelector('.mat-mdc-button-ripple');
    const afterStyles = window.getComputedStyle(el, '::after');
    const beforeStyles = window.getComputedStyle(el, '::before');
    
    const results = {
      ripple: null,
      stateLayer: null,
      after: {
        display: afterStyles.display,
        width: afterStyles.width,
        height: afterStyles.height,
        background: afterStyles.backgroundColor,
        position: afterStyles.position,
        top: afterStyles.top,
        left: afterStyles.left,
        content: afterStyles.content
      },
      before: {
        display: beforeStyles.display,
        background: beforeStyles.backgroundColor,
        width: beforeStyles.width,
        height: beforeStyles.height
      }
    };
    
    if (ripple) {
      const rippleRect = ripple.getBoundingClientRect();
      const buttonRect = el.getBoundingClientRect();
      const rippleComputed = window.getComputedStyle(ripple);
      results.ripple = {
        width: rippleRect.width,
        height: rippleRect.height,
        offsetTop: rippleRect.top - buttonRect.top,
        offsetLeft: rippleRect.left - buttonRect.left,
        background: rippleComputed.backgroundColor,
        position: rippleComputed.position,
        transform: rippleComputed.transform
      };
    }
    
    if (stateLayer) {
      const stateRect = stateLayer.getBoundingClientRect();
      const buttonRect = el.getBoundingClientRect();
      results.stateLayer = {
        width: stateRect.width,
        height: stateRect.height,
        offsetTop: stateRect.top - buttonRect.top,
        offsetLeft: stateRect.left - buttonRect.left
      };
    }
    
    return results;
  });
  
  console.log('Button dimensions:', normalState.button);
  console.log('Icon position in button:', normalState.icon);
  console.log('\nHover state layers:');
  console.log('::after pseudo-element:', hoverState.after);
  console.log('::before pseudo-element:', hoverState.before);
  if (hoverState.ripple) {
    console.log('MDC Ripple element:', hoverState.ripple);
  }
  if (hoverState.stateLayer) {
    console.log('Material state layer:', hoverState.stateLayer);
  }
  
  await browser.close();
})();