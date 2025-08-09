const { chromium } = require('playwright');

async function debugMotionBoxes() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Debugging Motion Box Styling...\n');
  
  await page.goto('http://localhost:4200/foundation/motion');
  await page.waitForSelector('app-root');
  
  // Switch to dark mode
  const darkButton = await page.locator('button:has-text("Dark")').first();
  if (await darkButton.count() > 0) {
    await darkButton.click();
    await page.waitForTimeout(1000);
  }
  
  const motionBoxInfo = await page.evaluate(() => {
    const boxes = document.querySelectorAll('.motion-box');
    const results = [];
    
    boxes.forEach((box, index) => {
      const styles = getComputedStyle(box);
      
      results.push({
        index: index,
        classes: box.className,
        textContent: box.textContent.trim(),
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        // Check what the CSS custom property resolves to
        primaryColorProperty: styles.getPropertyValue('background'),
        // Get the actual CSS custom property value from root
        customPrimaryValue: getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-primary'),
        customOnPrimaryValue: getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-on-primary'),
        // Check if it's actually using the custom property
        backgroundCSS: styles.background
      });
    });
    
    return {
      motionBoxes: results,
      rootTheme: document.documentElement.getAttribute('data-vt-theme'),
      rootClass: document.documentElement.className,
      primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-primary'),
      onPrimary: getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-on-primary')
    };
  });
  
  console.log(`Root theme: ${motionBoxInfo.rootTheme}`);
  console.log(`Root classes: ${motionBoxInfo.rootClass}`);
  console.log(`--md-sys-color-primary: "${motionBoxInfo.primaryColor}"`);
  console.log(`--md-sys-color-on-primary: "${motionBoxInfo.onPrimary}"`);
  console.log('');
  
  motionBoxInfo.motionBoxes.forEach(box => {
    console.log(`Motion Box ${box.index}: "${box.textContent}"`);
    console.log(`  Classes: ${box.classes}`);
    console.log(`  Background: ${box.backgroundColor}`);
    console.log(`  Color: ${box.color}`);
    console.log(`  CSS Background: ${box.backgroundCSS}`);
    console.log(`  Primary property from root: "${box.customPrimaryValue}"`);
    console.log(`  On-primary property from root: "${box.customOnPrimaryValue}"`);
    console.log('');
  });
  
  // Check if the CSS is being loaded properly
  const stylesheetInfo = await page.evaluate(() => {
    const results = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i];
      if (sheet.href) {
        results.push({
          href: sheet.href,
          disabled: sheet.disabled
        });
      }
    }
    return results;
  });
  
  console.log('Loaded stylesheets:');
  stylesheetInfo.forEach(sheet => {
    console.log(`  ${sheet.href} (disabled: ${sheet.disabled})`);
  });
  
  await browser.close();
}

debugMotionBoxes().catch(console.error);