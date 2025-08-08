const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4200');
  await page.waitForSelector('mat-card', { timeout: 5000 });
  
  // Full page screenshot
  await page.screenshot({ 
    path: 'analysis-full.png',
    fullPage: true 
  });
  
  // Button section close-up
  const buttonCard = await page.locator('mat-card').first();
  await buttonCard.screenshot({ path: 'analysis-buttons.png' });
  
  // Form section close-up
  const formCard = await page.locator('mat-card').nth(1);
  await formCard.screenshot({ path: 'analysis-forms.png' });
  
  // Typography section close-up
  const typographyCard = await page.locator('mat-card').last();
  await typographyCard.screenshot({ path: 'analysis-typography.png' });
  
  // Hover states
  const secondaryButton = await page.locator('button:has-text("Secondary")').first();
  if (await secondaryButton.isVisible()) {
    await secondaryButton.hover();
    await page.waitForTimeout(100);
    await page.screenshot({ path: 'analysis-hover-state.png', clip: { x: 50, y: 250, width: 800, height: 150 } });
  }
  
  // Focus state
  await page.focus('input[matInput]');
  await page.waitForTimeout(100);
  await formCard.screenshot({ path: 'analysis-focus-state.png' });
  
  // Get computed styles for analysis
  const styles = await page.evaluate(() => {
    const button = document.querySelector('.mat-mdc-raised-button');
    const input = document.querySelector('input[matInput]');
    const card = document.querySelector('.mat-mdc-card');
    const body = document.body;
    
    return {
      button: button ? {
        height: getComputedStyle(button).height,
        fontSize: getComputedStyle(button).fontSize,
        fontWeight: getComputedStyle(button).fontWeight,
        padding: getComputedStyle(button).padding,
        borderRadius: getComputedStyle(button).borderRadius,
        letterSpacing: getComputedStyle(button).letterSpacing
      } : null,
      input: input ? {
        height: getComputedStyle(input).height,
        fontSize: getComputedStyle(input).fontSize,
        padding: getComputedStyle(input).padding,
        border: getComputedStyle(input.closest('.mdc-text-field')).border
      } : null,
      card: card ? {
        padding: getComputedStyle(card).padding,
        border: getComputedStyle(card).border,
        borderRadius: getComputedStyle(card).borderRadius
      } : null,
      body: {
        fontFamily: getComputedStyle(body).fontFamily,
        fontSize: getComputedStyle(body).fontSize,
        lineHeight: getComputedStyle(body).lineHeight,
        color: getComputedStyle(body).color
      }
    };
  });
  
  console.log('Computed Styles Analysis:');
  console.log(JSON.stringify(styles, null, 2));
  
  await browser.close();
})();