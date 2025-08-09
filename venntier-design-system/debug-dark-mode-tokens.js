const { chromium } = require('playwright');

async function debugDarkModeTokens() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Debugging Dark Mode Token Issues...\n');
  
  // Navigate to a page with issues (motion page)
  await page.goto('http://localhost:4200/foundation/motion');
  await page.waitForSelector('app-root');
  
  console.log('📋 BEFORE Theme Toggle:');
  
  // Check initial state
  const initialState = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    return {
      rootDataTheme: root.getAttribute('data-vt-theme'),
      rootClass: root.className,
      bodyClass: body.className,
      computedBodyBg: getComputedStyle(body).backgroundColor,
      mdSysSurface: getComputedStyle(root).getPropertyValue('--md-sys-color-surface'),
      mdSysSurfaceContainerLow: getComputedStyle(root).getPropertyValue('--md-sys-color-surface-container-low'),
      mdSysSurfaceContainerLowest: getComputedStyle(root).getPropertyValue('--md-sys-color-surface-container-lowest'),
    };
  });
  
  console.log(`  Root data-theme: ${initialState.rootDataTheme}`);
  console.log(`  Root classes: ${initialState.rootClass}`);
  console.log(`  Body classes: ${initialState.bodyClass}`);
  console.log(`  Body background: ${initialState.computedBodyBg}`);
  console.log(`  --md-sys-color-surface: ${initialState.mdSysSurface}`);
  console.log(`  --md-sys-color-surface-container-low: ${initialState.mdSysSurfaceContainerLow}`);
  console.log(`  --md-sys-color-surface-container-lowest: ${initialState.mdSysSurfaceContainerLowest}`);
  
  // Find and click theme toggle
  console.log('\n🌙 Clicking Theme Toggle...');
  try {
    // Try multiple selectors for theme toggle
    const toggleSelectors = [
      '[data-test="theme-toggle"]',
      'button:has-text("Toggle theme")',
      'button:has-text("Dark")',
      'button[aria-label*="theme"]',
      '.mat-icon-button',
      'button mat-icon'
    ];
    
    let toggleFound = false;
    for (const selector of toggleSelectors) {
      const toggle = await page.locator(selector).first();
      if (await toggle.count() > 0) {
        console.log(`  Found toggle with selector: ${selector}`);
        await toggle.click();
        toggleFound = true;
        break;
      }
    }
    
    if (!toggleFound) {
      console.log('  No theme toggle found, attempting to toggle via service...');
      await page.evaluate(() => {
        // Try to access the theme service directly
        const app = document.querySelector('app-root');
        if (app && app.componentInstance) {
          // This might not work, but worth trying
          console.log('App component found');
        }
      });
    }
  } catch (error) {
    console.log(`  Error clicking toggle: ${error.message}`);
  }
  
  // Wait for theme to apply
  await page.waitForTimeout(1000);
  
  console.log('\n📋 AFTER Theme Toggle:');
  
  const afterState = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    return {
      rootDataTheme: root.getAttribute('data-vt-theme'),
      rootClass: root.className,
      bodyClass: body.className,
      computedBodyBg: getComputedStyle(body).backgroundColor,
      mdSysSurface: getComputedStyle(root).getPropertyValue('--md-sys-color-surface'),
      mdSysSurfaceContainerLow: getComputedStyle(root).getPropertyValue('--md-sys-color-surface-container-low'),
      mdSysSurfaceContainerLowest: getComputedStyle(root).getPropertyValue('--md-sys-color-surface-container-lowest'),
    };
  });
  
  console.log(`  Root data-theme: ${afterState.rootDataTheme}`);
  console.log(`  Root classes: ${afterState.rootClass}`);
  console.log(`  Body classes: ${afterState.bodyClass}`);
  console.log(`  Body background: ${afterState.computedBodyBg}`);
  console.log(`  --md-sys-color-surface: ${afterState.mdSysSurface}`);
  console.log(`  --md-sys-color-surface-container-low: ${afterState.mdSysSurfaceContainerLow}`);
  console.log(`  --md-sys-color-surface-container-lowest: ${afterState.mdSysSurfaceContainerLowest}`);
  
  // Check if ExampleViewer elements are using the right colors
  const exampleViewerState = await page.evaluate(() => {
    const exampleViewers = document.querySelectorAll('.example-viewer');
    const results = [];
    
    exampleViewers.forEach((el, index) => {
      const styles = getComputedStyle(el);
      results.push({
        index,
        backgroundColor: styles.backgroundColor,
        computedSurface: styles.getPropertyValue('background').includes('var(--md-sys-color-surface)'),
        customPropertyValue: getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-surface')
      });
    });
    
    return results;
  });
  
  console.log('\n🎨 Example Viewer Elements:');
  exampleViewerState.forEach(item => {
    console.log(`  Example Viewer ${item.index}: bg=${item.backgroundColor}`);
  });
  
  // Check if dark theme was actually applied
  const themeApplied = afterState.rootDataTheme === 'dark' || afterState.rootClass.includes('vt-theme-dark');
  console.log(`\n✅ Dark theme applied: ${themeApplied}`);
  
  if (!themeApplied) {
    console.log('⚠️  Dark theme was not applied. Possible issues:');
    console.log('   - Theme service not working correctly');
    console.log('   - Theme toggle button not found');
    console.log('   - JavaScript execution issue');
  } else if (afterState.mdSysSurface.trim() === '' || afterState.mdSysSurface === initialState.mdSysSurface) {
    console.log('⚠️  Dark theme applied but CSS custom properties not updating. Possible issues:');
    console.log('   - CSS selector specificity problems');
    console.log('   - Missing CSS import');
    console.log('   - CSS custom property definitions not loaded');
  }
  
  // Take a screenshot for reference
  await page.screenshot({ path: './debug-dark-mode.png', fullPage: true });
  console.log('\n📸 Screenshot saved: debug-dark-mode.png');
  
  await browser.close();
}

debugDarkModeTokens().catch(console.error);