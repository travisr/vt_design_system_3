const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('.mat-drawer-content', { timeout: 5000 });
  
  // Check the header element which contains the toolbar
  const header = await page.$('header');
  if (header) {
    const headerStyles = await header.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        marginTop: computed.marginTop,
        paddingTop: computed.paddingTop,
        position: computed.position,
        top: computed.top,
        boundingTop: rect.top,
        display: computed.display
      };
    });
    
    console.log('\n=== HEADER ELEMENT STYLES ===');
    console.log('Margin-top:', headerStyles.marginTop);
    console.log('Padding-top:', headerStyles.paddingTop);
    console.log('Position:', headerStyles.position);
    console.log('Top:', headerStyles.top);
    console.log('Actual top position:', headerStyles.boundingTop + 'px');
    console.log('Display:', headerStyles.display);
  }
  
  // Check the parent demo-content structure
  const demoContent = await page.$('.demo-content');
  if (demoContent) {
    const contentStyles = await demoContent.evaluate(el => {
      const computed = window.getComputedStyle(el);
      // Check if there's any ::before content
      const beforeStyles = window.getComputedStyle(el, '::before');
      return {
        paddingTop: computed.paddingTop,
        marginTop: computed.marginTop,
        display: computed.display,
        flexDirection: computed.flexDirection,
        beforeContent: beforeStyles.content,
        beforeHeight: beforeStyles.height,
        beforeDisplay: beforeStyles.display
      };
    });
    
    console.log('\n=== DEMO-CONTENT STYLES ===');
    console.log('Padding-top:', contentStyles.paddingTop);
    console.log('Margin-top:', contentStyles.marginTop);
    console.log('Display:', contentStyles.display);
    console.log('Flex-direction:', contentStyles.flexDirection);
    console.log('::before content:', contentStyles.beforeContent);
    console.log('::before height:', contentStyles.beforeHeight);
    console.log('::before display:', contentStyles.beforeDisplay);
  }
  
  // Check Material CDK overlay container (might have inserted elements)
  const cdkOverlay = await page.$('.cdk-overlay-container');
  if (cdkOverlay) {
    console.log('\n=== CDK OVERLAY DETECTED ===');
  }
  
  // Check for any unexpected elements before the toolbar
  const unexpectedElements = await page.evaluate(() => {
    const drawerContent = document.querySelector('.mat-drawer-content');
    const header = document.querySelector('header');
    const elements = [];
    
    if (drawerContent && header) {
      // Get all children of drawer content
      const children = Array.from(drawerContent.children);
      const headerIndex = children.indexOf(header);
      
      // Check if there are elements before the header
      if (headerIndex > 0) {
        for (let i = 0; i < headerIndex; i++) {
          const el = children[i];
          const rect = el.getBoundingClientRect();
          elements.push({
            tag: el.tagName,
            className: el.className,
            id: el.id,
            height: rect.height,
            display: window.getComputedStyle(el).display
          });
        }
      }
    }
    
    return elements;
  });
  
  if (unexpectedElements.length > 0) {
    console.log('\n=== ELEMENTS BEFORE HEADER ===');
    unexpectedElements.forEach(el => {
      console.log(`- ${el.tag} (class: ${el.className}, height: ${el.height}px, display: ${el.display})`);
    });
  } else {
    console.log('\n=== NO ELEMENTS BEFORE HEADER ===');
  }
  
  await browser.close();
})();