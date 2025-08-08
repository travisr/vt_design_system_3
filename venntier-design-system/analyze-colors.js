const { chromium } = require('playwright');

async function analyzeColors() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4200');
  await page.waitForSelector('mat-sidenav', { timeout: 10000 });
  
  // Get nav background color
  const navBg = await page.evaluate(() => {
    const nav = document.querySelector('mat-sidenav');
    return window.getComputedStyle(nav).backgroundColor;
  });
  
  // Get CSS variables
  const cssVars = await page.evaluate(() => {
    const root = window.getComputedStyle(document.documentElement);
    return {
      hover: root.getPropertyValue('--md-sys-color-hover'),
      selected: root.getPropertyValue('--md-sys-color-selected'),
      surface: root.getPropertyValue('--md-sys-color-surface'),
      surfaceContainerLow: root.getPropertyValue('--md-sys-color-surface-container-low'),
      surfaceVariant: root.getPropertyValue('--md-sys-color-surface-variant'),
      background: root.getPropertyValue('--md-sys-color-background')
    };
  });
  
  console.log('=== CURRENT COLORS ===');
  console.log('Nav Background:', navBg);
  console.log('\nCSS Variables:');
  Object.entries(cssVars).forEach(([key, value]) => {
    console.log(`  --md-sys-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`);
  });
  
  // Test hover on item
  const item = await page.locator('a[mat-list-item]:not(.active)').first();
  
  // Before hover
  const beforeHover = await item.evaluate(el => {
    return window.getComputedStyle(el).backgroundColor;
  });
  
  // Hover
  await item.hover();
  await page.waitForTimeout(200);
  
  // After hover
  const afterHover = await item.evaluate(el => {
    return window.getComputedStyle(el).backgroundColor;
  });
  
  console.log('\n=== HOVER TEST ===');
  console.log('Before hover:', beforeHover);
  console.log('After hover:', afterHover);
  
  // Compare colors
  function rgbToHex(rgb) {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return rgb;
    const r = parseInt(match[1]).toString(16).padStart(2, '0');
    const g = parseInt(match[2]).toString(16).padStart(2, '0');
    const b = parseInt(match[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }
  
  console.log('\n=== COLOR COMPARISON ===');
  console.log('Nav bg hex:', rgbToHex(navBg));
  console.log('Hover hex:', rgbToHex(afterHover));
  console.log('Are they similar?', rgbToHex(navBg) === rgbToHex(afterHover) ? 'YES - PROBLEM!' : 'No, different colors');
  
  // Check what the hover SHOULD be
  console.log('\n=== EXPECTED vs ACTUAL ===');
  console.log('Expected hover (--md-sys-color-hover):', cssVars.hover);
  console.log('Actual hover color:', rgbToHex(afterHover));
  
  await browser.close();
}

analyzeColors().catch(console.error);