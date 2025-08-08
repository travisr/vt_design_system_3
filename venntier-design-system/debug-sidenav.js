const { chromium } = require('playwright');

async function debugSidenav() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  // Get detailed info about nav items
  const itemInfo = await page.evaluate(() => {
    const items = document.querySelectorAll('a[mat-list-item]');
    return Array.from(items).slice(0, 3).map((item, i) => {
      // Get all classes
      const classes = Array.from(item.classList);
      
      // Get parent classes
      const parent = item.parentElement;
      const parentClasses = parent ? Array.from(parent.classList) : [];
      
      // Get computed styles
      const styles = window.getComputedStyle(item);
      
      // Try to trigger hover via JS
      item.classList.add('hover-test');
      const hoverStyles = window.getComputedStyle(item);
      item.classList.remove('hover-test');
      
      return {
        index: i,
        tagName: item.tagName,
        classes: classes,
        parentTag: parent?.tagName,
        parentClasses: parentClasses,
        hasMatListItemAttr: item.hasAttribute('mat-list-item'),
        backgroundColor: styles.backgroundColor,
        cssVarHover: styles.getPropertyValue('--md-sys-color-hover'),
        innerHTML: item.innerHTML.substring(0, 100)
      };
    });
  });
  
  console.log('=== NAV ITEM DEBUG INFO ===');
  itemInfo.forEach(info => {
    console.log(`\nItem ${info.index}:`);
    console.log(`  Tag: ${info.tagName}`);
    console.log(`  Classes: ${info.classes.join(', ')}`);
    console.log(`  Parent: ${info.parentTag} (${info.parentClasses.join(', ')})`);
    console.log(`  Has mat-list-item attr: ${info.hasMatListItemAttr}`);
    console.log(`  Background: ${info.backgroundColor}`);
    console.log(`  --md-sys-color-hover: ${info.cssVarHover}`);
  });
  
  // Check if styles.scss is loaded
  const stylesheets = await page.evaluate(() => {
    return Array.from(document.styleSheets).map(sheet => sheet.href || 'inline');
  });
  console.log('\n=== LOADED STYLESHEETS ===');
  stylesheets.forEach(s => console.log(`  - ${s}`));
  
  await browser.close();
}

debugSidenav().catch(console.error);