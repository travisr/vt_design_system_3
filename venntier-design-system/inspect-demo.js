const { chromium } = require('playwright');

async function inspectDemo() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to demo app...');
    await page.goto('http://localhost:4200', { waitUntil: 'networkidle' });
    
    // Wait for the page to load
    await page.waitForSelector('button[mat-icon-button]', { timeout: 10000 });
    
    console.log('=== TOOLBAR STRUCTURE ===');
    
    // Get toolbar structure
    const toolbarInfo = await page.evaluate(() => {
      const toolbar = document.querySelector('mat-toolbar, .demo-toolbar');
      const sidenav = document.querySelector('.vt-sidenav-header');
      const sidenavContent = document.querySelector('mat-sidenav-content');
      const header = document.querySelector('header');
      
      return {
        toolbar: toolbar ? {
          className: toolbar.className,
          computedStyle: window.getComputedStyle(toolbar),
          height: toolbar.offsetHeight,
          boundingRect: toolbar.getBoundingClientRect()
        } : null,
        sidenav: sidenav ? {
          height: sidenav.offsetHeight,
          boundingRect: sidenav.getBoundingClientRect()
        } : null,
        sidenavContent: sidenavContent ? {
          computedStyle: window.getComputedStyle(sidenavContent),
          boundingRect: sidenavContent.getBoundingClientRect()
        } : null,
        header: header ? {
          computedStyle: window.getComputedStyle(header),
          boundingRect: header.getBoundingClientRect()
        } : null
      };
    });
    
    console.log('Toolbar height:', toolbarInfo.toolbar?.height);
    console.log('Toolbar top:', toolbarInfo.toolbar?.boundingRect.top);
    console.log('Toolbar margin:', toolbarInfo.toolbar?.computedStyle.margin);
    console.log('Toolbar padding:', toolbarInfo.toolbar?.computedStyle.padding);
    
    console.log('Sidenav header height:', toolbarInfo.sidenav?.height);
    console.log('Sidenav header top:', toolbarInfo.sidenav?.boundingRect.top);
    
    console.log('Mat-sidenav-content padding:', toolbarInfo.sidenavContent?.computedStyle.padding);
    console.log('Mat-sidenav-content margin:', toolbarInfo.sidenavContent?.computedStyle.margin);
    console.log('Mat-sidenav-content top:', toolbarInfo.sidenavContent?.boundingRect.top);
    
    console.log('Header padding:', toolbarInfo.header?.computedStyle.padding);
    console.log('Header margin:', toolbarInfo.header?.computedStyle.margin);
    console.log('Header top:', toolbarInfo.header?.boundingRect.top);
    
    console.log('\n=== ICON BUTTON STRUCTURE ===');
    
    // Get icon button info
    const buttonInfo = await page.evaluate(() => {
      const button = document.querySelector('button[mat-icon-button]');
      if (!button) return null;
      
      const computedStyle = window.getComputedStyle(button);
      const rect = button.getBoundingClientRect();
      
      // Look for state layer elements
      const stateLayerElements = [];
      const allElements = button.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.className.includes('state') || el.className.includes('ripple') || el.className.includes('touch')) {
          stateLayerElements.push({
            tagName: el.tagName,
            className: el.className,
            computedStyle: window.getComputedStyle(el)
          });
        }
      });
      
      return {
        width: button.offsetWidth,
        height: button.offsetHeight,
        rect: rect,
        computedStyle: {
          width: computedStyle.width,
          height: computedStyle.height,
          padding: computedStyle.padding,
          margin: computedStyle.margin
        },
        innerHTML: button.innerHTML,
        stateLayerElements: stateLayerElements
      };
    });
    
    console.log('Button size:', buttonInfo?.width, 'x', buttonInfo?.height);
    console.log('Button computed width/height:', buttonInfo?.computedStyle.width, buttonInfo?.computedStyle.height);
    console.log('Button padding:', buttonInfo?.computedStyle.padding);
    console.log('Button margin:', buttonInfo?.computedStyle.margin);
    console.log('Button HTML:', buttonInfo?.innerHTML);
    console.log('State layer elements found:', buttonInfo?.stateLayerElements.length);
    
    buttonInfo?.stateLayerElements.forEach((el, i) => {
      console.log(`State layer ${i}:`, el.className);
      console.log(`  Size:`, el.computedStyle.width, 'x', el.computedStyle.height);
    });
    
    // Keep browser open for manual inspection
    console.log('\nBrowser is open for manual inspection. Press Ctrl+C to close.');
    await page.waitForTimeout(60000); // Wait 1 minute
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

inspectDemo().catch(console.error);