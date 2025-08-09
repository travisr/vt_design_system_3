const { chromium } = require('playwright');

async function findWhiteElementsInDarkMode() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Finding Elements with White Backgrounds in Dark Mode...\n');
  
  // Navigate to motion page where we saw issues
  await page.goto('http://localhost:4200/foundation/motion');
  await page.waitForSelector('app-root');
  
  // Switch to dark mode first
  const darkButton = await page.locator('button:has-text("Dark")').first();
  if (await darkButton.count() > 0) {
    await darkButton.click();
    await page.waitForTimeout(1000);
    console.log('✅ Switched to dark mode');
  }
  
  // Find all elements with white or very light backgrounds
  const whiteElements = await page.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const whiteElements = [];
    
    allElements.forEach((el, index) => {
      const styles = getComputedStyle(el);
      const bg = styles.backgroundColor;
      
      // Check for white or very light backgrounds
      const isWhite = (
        bg === 'rgb(255, 255, 255)' ||
        bg === 'rgba(255, 255, 255, 1)' ||
        bg === '#ffffff' ||
        bg === '#fff' ||
        bg === 'white'
      );
      
      const isVeryLight = (
        bg.startsWith('rgb(2') && bg.includes('255') // rgb(250+, 250+, 250+)
      );
      
      if ((isWhite || isVeryLight) && el.offsetWidth > 0 && el.offsetHeight > 0) {
        // Get some context about the element
        const rect = el.getBoundingClientRect();
        const tagName = el.tagName.toLowerCase();
        const classes = el.className || '';
        const id = el.id || '';
        const textContent = el.textContent?.trim().substring(0, 50) || '';
        
        whiteElements.push({
          tag: tagName,
          classes: classes,
          id: id,
          background: bg,
          textContent: textContent,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          position: {
            x: Math.round(rect.left),
            y: Math.round(rect.top)
          }
        });
      }
    });
    
    return whiteElements;
  });
  
  console.log(`\n🎯 Found ${whiteElements.length} elements with white/light backgrounds:\n`);
  
  whiteElements.forEach((element, index) => {
    console.log(`${index + 1}. <${element.tag}>`);
    if (element.id) console.log(`   ID: ${element.id}`);
    if (element.classes) console.log(`   Classes: ${element.classes}`);
    console.log(`   Background: ${element.background}`);
    console.log(`   Size: ${element.width}x${element.height}px`);
    console.log(`   Position: (${element.position.x}, ${element.position.y})`);
    if (element.textContent) console.log(`   Content: "${element.textContent}"`);
    console.log('');
  });
  
  // Take a screenshot with highlighted white elements
  await page.addStyleTag({
    content: `
      .highlight-white-bg {
        outline: 3px solid red !important;
        outline-offset: -3px !important;
      }
    `
  });
  
  // Highlight white elements
  await page.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const styles = getComputedStyle(el);
      const bg = styles.backgroundColor;
      
      const isWhite = (
        bg === 'rgb(255, 255, 255)' ||
        bg === 'rgba(255, 255, 255, 1)' ||
        bg === '#ffffff' ||
        bg === '#fff' ||
        bg === 'white'
      );
      
      if (isWhite && el.offsetWidth > 10 && el.offsetHeight > 10) {
        el.classList.add('highlight-white-bg');
      }
    });
  });
  
  await page.screenshot({ path: './highlighted-white-elements.png', fullPage: true });
  console.log('📸 Screenshot with highlighted elements saved: highlighted-white-elements.png');
  
  await browser.close();
  return whiteElements;
}

findWhiteElementsInDarkMode().catch(console.error);