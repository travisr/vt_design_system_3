const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('.mat-drawer-content', { timeout: 5000 });
  
  // Inspect mat-drawer-content padding
  const drawerContent = await page.$('.mat-drawer-content');
  const drawerStyles = await drawerContent.evaluate(el => {
    const computed = window.getComputedStyle(el);
    return {
      padding: computed.padding,
      paddingTop: computed.paddingTop,
      paddingRight: computed.paddingRight,
      paddingBottom: computed.paddingBottom,
      paddingLeft: computed.paddingLeft,
      margin: computed.margin,
      marginTop: computed.marginTop,
      className: el.className,
      tagName: el.tagName,
      appliedRules: Array.from(el.classList)
    };
  });
  
  console.log('\n=== MAT-DRAWER-CONTENT STYLES ===');
  console.log('Padding:', drawerStyles.padding);
  console.log('Padding-top:', drawerStyles.paddingTop);
  console.log('Padding-right:', drawerStyles.paddingRight);
  console.log('Margin-top:', drawerStyles.marginTop);
  console.log('Classes:', drawerStyles.appliedRules);
  
  // Inspect toolbar positioning
  const toolbar = await page.$('.demo-toolbar');
  if (toolbar) {
    const toolbarStyles = await toolbar.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        position: computed.position,
        top: computed.top,
        marginTop: computed.marginTop,
        paddingTop: computed.paddingTop,
        boundingTop: rect.top,
        height: computed.height
      };
    });
    
    console.log('\n=== TOOLBAR STYLES ===');
    console.log('Position:', toolbarStyles.position);
    console.log('Top:', toolbarStyles.top);
    console.log('Margin-top:', toolbarStyles.marginTop);
    console.log('Actual top position:', toolbarStyles.boundingTop + 'px');
    console.log('Height:', toolbarStyles.height);
  }
  
  // Inspect icon button hover state
  const iconButton = await page.$('button[mat-icon-button]');
  if (iconButton) {
    // Get normal state
    const normalStyles = await iconButton.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        width: computed.width,
        height: computed.height,
        padding: computed.padding,
        position: computed.position,
        bounds: {
          width: rect.width,
          height: rect.height
        }
      };
    });
    
    // Hover and get hover state
    await iconButton.hover();
    await page.waitForTimeout(100);
    
    const hoverStyles = await iconButton.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const afterStyles = window.getComputedStyle(el, '::after');
      const beforeStyles = window.getComputedStyle(el, '::before');
      
      // Check for any hover state elements
      const ripple = el.querySelector('.mdc-icon-button__ripple');
      const rippleStyles = ripple ? window.getComputedStyle(ripple) : null;
      
      return {
        background: computed.backgroundColor,
        afterContent: afterStyles.content,
        afterBackground: afterStyles.backgroundColor,
        afterWidth: afterStyles.width,
        afterHeight: afterStyles.height,
        afterPosition: afterStyles.position,
        afterTransform: afterStyles.transform,
        beforeBackground: beforeStyles.backgroundColor,
        rippleBackground: rippleStyles?.backgroundColor,
        rippleWidth: rippleStyles?.width,
        rippleHeight: rippleStyles?.height
      };
    });
    
    console.log('\n=== ICON BUTTON STYLES ===');
    console.log('Normal - Width:', normalStyles.width, 'Height:', normalStyles.height);
    console.log('Normal - Padding:', normalStyles.padding);
    console.log('Hover - Background:', hoverStyles.background);
    console.log('Hover - ::after background:', hoverStyles.afterBackground);
    console.log('Hover - ::after size:', hoverStyles.afterWidth, 'x', hoverStyles.afterHeight);
    console.log('Hover - ::after transform:', hoverStyles.afterTransform);
    console.log('Hover - Ripple background:', hoverStyles.rippleBackground);
    console.log('Hover - Ripple size:', hoverStyles.rippleWidth, 'x', hoverStyles.rippleHeight);
  }
  
  // Check which stylesheets are loaded
  const stylesheets = await page.evaluate(() => {
    return Array.from(document.styleSheets).map(sheet => {
      try {
        return {
          href: sheet.href,
          rules: sheet.cssRules ? sheet.cssRules.length : 0
        };
      } catch (e) {
        return { href: sheet.href, error: 'Cannot access' };
      }
    });
  });
  
  console.log('\n=== LOADED STYLESHEETS ===');
  stylesheets.forEach(sheet => {
    if (sheet.href) {
      console.log(`- ${sheet.href} (${sheet.rules || sheet.error} rules)`);
    }
  });
  
  await browser.close();
})();