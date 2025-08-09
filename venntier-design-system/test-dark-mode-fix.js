const { chromium } = require('playwright');

async function testDarkModeFix() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🧪 Testing Dark Mode Fixes...\n');
  
  // Test the spacing page (had the most critical issues)
  console.log('📄 Testing Spacing Page...');
  await page.goto('http://localhost:4200/foundation/spacing');
  await page.waitForSelector('app-root');
  
  // Switch to dark mode
  const darkButton = await page.locator('button:has-text("Dark")').first();
  if (await darkButton.count() > 0) {
    await darkButton.click();
    await page.waitForTimeout(1000);
    console.log('  ✅ Switched to dark mode');
  }
  
  // Check if there are any white backgrounds remaining
  const whiteBackgrounds = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const whiteElements = [];
    
    elements.forEach(el => {
      const styles = getComputedStyle(el);
      const bg = styles.backgroundColor;
      
      if (bg === 'rgb(255, 255, 255)' || bg === 'rgba(255, 255, 255, 1)') {
        if (el.offsetWidth > 10 && el.offsetHeight > 10) {
          // Check if it's actually visible and not using CSS variables
          const hasVariable = el.getAttribute('style')?.includes('var(--');
          if (!hasVariable && el.getAttribute('style')?.includes('background')) {
            whiteElements.push({
              tag: el.tagName.toLowerCase(),
              classes: el.className,
              style: el.getAttribute('style')
            });
          }
        }
      }
    });
    
    return whiteElements;
  });
  
  if (whiteBackgrounds.length === 0) {
    console.log('  ✅ No hardcoded white backgrounds found!');
  } else {
    console.log(`  ⚠️  Found ${whiteBackgrounds.length} elements with potential issues`);
    console.log('  Elements:', whiteBackgrounds.slice(0, 3));
  }
  
  // Take a screenshot for visual verification
  await page.screenshot({ path: './spacing-dark-mode-fixed.png', fullPage: true });
  console.log('  📸 Screenshot saved: spacing-dark-mode-fixed.png');
  
  // Test the motion page
  console.log('\n📄 Testing Motion Page...');
  await page.goto('http://localhost:4200/foundation/motion');
  await page.waitForSelector('app-root');
  
  // Dark mode should persist
  await page.waitForTimeout(500);
  
  // Check motion boxes
  const motionBoxColors = await page.evaluate(() => {
    const boxes = document.querySelectorAll('.motion-box');
    return Array.from(boxes).map(box => {
      const styles = getComputedStyle(box);
      return {
        background: styles.backgroundColor,
        color: styles.color
      };
    });
  });
  
  console.log('  Motion box colors:', motionBoxColors[0] || 'No motion boxes found');
  
  await page.screenshot({ path: './motion-dark-mode-fixed.png', fullPage: true });
  console.log('  📸 Screenshot saved: motion-dark-mode-fixed.png');
  
  console.log('\n✨ Test complete! Check screenshots for visual verification.');
  
  await browser.close();
}

testDarkModeFix().catch(console.error);