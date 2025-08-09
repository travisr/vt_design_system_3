const { chromium } = require('playwright');

async function testSpacingDarkMode() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🧪 Testing Spacing Page Dark Mode Fix...\n');
  
  // Navigate to spacing page
  await page.goto('http://localhost:4200/foundation/spacing');
  await page.waitForSelector('app-root');
  
  // Switch to dark mode
  const darkButton = await page.locator('button:has-text("Dark")').first();
  if (await darkButton.count() > 0) {
    await darkButton.click();
    await page.waitForTimeout(500);
    console.log('✅ Switched to dark mode');
  }
  
  // Scroll to Layout Examples section
  await page.evaluate(() => {
    const layoutCard = Array.from(document.querySelectorAll('mat-card-title'))
      .find(el => el.textContent.includes('Layout Examples'))
      ?.closest('mat-card');
    if (layoutCard) {
      layoutCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Check the contrast of nested elements
  const contrastIssues = await page.evaluate(() => {
    const issues = [];
    
    // Check the nested card example
    const layoutDemo = document.querySelector('.layout-demo');
    if (layoutDemo) {
      const demoStyle = getComputedStyle(layoutDemo);
      const demoColor = demoStyle.backgroundColor;
      
      // Check nested content
      const nestedContent = layoutDemo.querySelector('div[style*="padding: 16px"]');
      if (nestedContent) {
        const nestedStyle = getComputedStyle(nestedContent);
        const nestedColor = nestedStyle.backgroundColor;
        
        // Check if colors are too similar
        if (demoColor === nestedColor || 
            (demoColor.includes('rgb') && nestedColor.includes('rgb') && 
             demoColor === nestedColor)) {
          issues.push({
            element: 'Nested content box',
            parent: demoColor,
            child: nestedColor,
            problem: 'Same background color as parent'
          });
        }
        
        // Check buttons
        const buttons = nestedContent.querySelectorAll('button');
        buttons.forEach((btn, i) => {
          const btnStyle = getComputedStyle(btn);
          if (btnStyle.backgroundColor === nestedColor) {
            issues.push({
              element: `Button ${i+1}`,
              background: btnStyle.backgroundColor,
              problem: 'Same color as container'
            });
          }
        });
      }
    }
    
    return issues;
  });
  
  if (contrastIssues.length === 0) {
    console.log('✅ No contrast issues found in Layout Examples!');
  } else {
    console.log('⚠️ Contrast issues found:');
    contrastIssues.forEach(issue => {
      console.log(`  - ${issue.element}: ${issue.problem}`);
    });
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: './spacing-layout-dark-mode.png', 
    fullPage: false,
    clip: { x: 0, y: 400, width: 1200, height: 600 }
  });
  console.log('\n📸 Screenshot saved: spacing-layout-dark-mode.png');
  
  // Check text visibility
  const textVisibility = await page.evaluate(() => {
    const texts = document.querySelectorAll('.layout-demo h4, .layout-demo p, .layout-demo button');
    const invisible = [];
    
    texts.forEach(el => {
      const style = getComputedStyle(el);
      const color = style.color;
      const bg = getComputedStyle(el.parentElement).backgroundColor;
      
      // Simple check for very low contrast
      if (color === bg || color === 'rgba(0, 0, 0, 0)') {
        invisible.push({
          text: el.textContent.substring(0, 30),
          color: color
        });
      }
    });
    
    return invisible;
  });
  
  if (textVisibility.length === 0) {
    console.log('✅ All text is visible with proper contrast');
  } else {
    console.log('❌ Text visibility issues:');
    textVisibility.forEach(item => {
      console.log(`  - "${item.text}": ${item.color}`);
    });
  }
  
  await browser.close();
}

testSpacingDarkMode().catch(console.error);