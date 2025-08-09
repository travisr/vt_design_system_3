const { chromium } = require('playwright');
const fs = require('fs');

async function inspectFoundationPagesInDarkMode() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport for consistent screenshots
  await page.setViewportSize({ width: 1200, height: 800 });
  
  const foundationPages = [
    { name: 'colors', url: 'http://localhost:4200/foundation/colors' },
    { name: 'typography', url: 'http://localhost:4200/foundation/typography' },
    { name: 'icons', url: 'http://localhost:4200/foundation/icons' },
    { name: 'spacing', url: 'http://localhost:4200/foundation/spacing' },
    { name: 'motion', url: 'http://localhost:4200/foundation/motion' }
  ];
  
  const issues = [];
  
  console.log('🌙 Starting Dark Mode Foundation Pages Inspection...\n');
  
  for (const foundationPage of foundationPages) {
    console.log(`📋 Inspecting ${foundationPage.name} page...`);
    
    try {
      // Navigate to the page
      await page.goto(foundationPage.url);
      await page.waitForSelector('app-root', { timeout: 10000 });
      
      // Switch to dark mode
      console.log(`  🌙 Switching to dark mode...`);
      const themeToggle = await page.locator('[data-test="theme-toggle"]').first();
      if (await themeToggle.count() > 0) {
        await themeToggle.click();
        await page.waitForTimeout(500); // Wait for theme transition
      } else {
        // Alternative: look for any button with theme/dark text
        const darkButton = await page.locator('button:has-text("Dark"), button:has-text("Toggle"), [aria-label*="theme"]').first();
        if (await darkButton.count() > 0) {
          await darkButton.click();
          await page.waitForTimeout(500);
        } else {
          console.log(`    ⚠️  Could not find theme toggle button`);
        }
      }
      
      // Wait for dark theme to apply
      await page.waitForTimeout(1000);
      
      // Check if dark theme is actually applied
      const bodyStyles = await page.evaluate(() => {
        const body = document.body;
        const styles = window.getComputedStyle(body);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      });
      
      console.log(`    📊 Body styles: bg=${bodyStyles.backgroundColor}, color=${bodyStyles.color}`);
      
      // Take a screenshot
      const screenshotPath = `./dark-mode-${foundationPage.name}.png`;
      await page.screenshot({ 
        path: screenshotPath,
        fullPage: true 
      });
      console.log(`    📸 Screenshot saved: ${screenshotPath}`);
      
      // Inspect specific elements that commonly have dark mode issues
      const elementInspection = await page.evaluate(() => {
        const elementsToCheck = [
          { selector: '.mat-mdc-card', name: 'Cards' },
          { selector: '.mat-mdc-button', name: 'Buttons' },
          { selector: '.example-viewer', name: 'Example Viewers' },
          { selector: '.page-header', name: 'Page Headers' },
          { selector: '.mat-toolbar', name: 'Toolbar' },
          { selector: '.mat-sidenav', name: 'Sidenav' },
          { selector: 'mat-icon', name: 'Icons' },
          { selector: 'h1, h2, h3, h4, h5, h6', name: 'Headings' },
          { selector: 'p, span, div', name: 'Text Content' },
          { selector: '.color-swatch', name: 'Color Swatches' },
          { selector: '.typography-example', name: 'Typography Examples' },
          { selector: '.spacing-example', name: 'Spacing Examples' }
        ];
        
        const results = [];
        
        elementsToCheck.forEach(({ selector, name }) => {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            elements.forEach((el, index) => {
              const styles = window.getComputedStyle(el);
              const hasLightBg = styles.backgroundColor === 'rgb(255, 255, 255)' || 
                                 styles.backgroundColor === 'rgba(255, 255, 255, 1)' ||
                                 styles.backgroundColor === '#ffffff' ||
                                 styles.backgroundColor === '#fff';
              const hasDarkText = styles.color === 'rgb(0, 0, 0)' || 
                                  styles.color === 'rgba(0, 0, 0, 1)' ||
                                  styles.color === '#000000' ||
                                  styles.color === '#000';
              const hasLowContrast = (
                (hasLightBg && styles.color.includes('255')) ||
                (styles.backgroundColor.includes('0, 0, 0') && hasDarkText)
              );
              
              if (hasLightBg || hasDarkText || hasLowContrast) {
                results.push({
                  element: name,
                  index: index,
                  selector: selector,
                  issue: hasLightBg ? 'Light background in dark mode' :
                         hasDarkText ? 'Dark text in dark mode' : 
                         'Low contrast detected',
                  backgroundColor: styles.backgroundColor,
                  color: styles.color,
                  textContent: el.textContent?.substring(0, 50) + '...'
                });
              }
            });
          }
        });
        
        return results;
      });
      
      // Check for Material theme classes
      const themeClassCheck = await page.evaluate(() => {
        const body = document.body;
        const html = document.documentElement;
        return {
          bodyClasses: body.className,
          htmlClasses: html.className,
          hasDarkTheme: body.classList.contains('dark-theme') || 
                       html.classList.contains('dark-theme') ||
                       body.classList.contains('mat-app-dark') ||
                       html.classList.contains('mat-app-dark')
        };
      });
      
      console.log(`    🎨 Theme classes: ${themeClassCheck.hasDarkTheme ? '✅ Dark theme detected' : '❌ No dark theme class found'}`);
      console.log(`    📝 Body classes: ${themeClassCheck.bodyClasses}`);
      
      if (elementInspection.length > 0) {
        console.log(`    ⚠️  Found ${elementInspection.length} potential dark mode issues:`);
        elementInspection.forEach(issue => {
          console.log(`      - ${issue.element}: ${issue.issue}`);
          console.log(`        Colors: bg=${issue.backgroundColor}, color=${issue.color}`);
        });
        
        issues.push({
          page: foundationPage.name,
          url: foundationPage.url,
          screenshot: screenshotPath,
          themeApplied: themeClassCheck.hasDarkTheme,
          bodyStyles,
          issues: elementInspection
        });
      } else {
        console.log(`    ✅ No obvious dark mode issues detected`);
        issues.push({
          page: foundationPage.name,
          url: foundationPage.url,
          screenshot: screenshotPath,
          themeApplied: themeClassCheck.hasDarkTheme,
          bodyStyles,
          issues: []
        });
      }
      
      console.log(`    ✅ Completed inspection of ${foundationPage.name}\n`);
      
    } catch (error) {
      console.log(`    ❌ Error inspecting ${foundationPage.name}:`, error.message);
      issues.push({
        page: foundationPage.name,
        url: foundationPage.url,
        error: error.message
      });
    }
  }
  
  // Generate detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: foundationPages.length,
      pagesWithIssues: issues.filter(i => i.issues && i.issues.length > 0).length,
      totalIssues: issues.reduce((sum, i) => sum + (i.issues ? i.issues.length : 0), 0)
    },
    pages: issues
  };
  
  // Save report
  fs.writeFileSync('./dark-mode-inspection-report.json', JSON.stringify(report, null, 2));
  console.log('📊 Detailed report saved to dark-mode-inspection-report.json');
  
  // Print summary
  console.log('\n🎯 DARK MODE INSPECTION SUMMARY');
  console.log('================================');
  console.log(`Pages inspected: ${report.summary.totalPages}`);
  console.log(`Pages with issues: ${report.summary.pagesWithIssues}`);
  console.log(`Total issues found: ${report.summary.totalIssues}`);
  
  if (report.summary.totalIssues > 0) {
    console.log('\n🔍 ISSUES BY PAGE:');
    issues.forEach(page => {
      if (page.issues && page.issues.length > 0) {
        console.log(`\n📄 ${page.page.toUpperCase()}`);
        console.log(`   Theme Applied: ${page.themeApplied ? '✅ Yes' : '❌ No'}`);
        console.log(`   Body Background: ${page.bodyStyles?.backgroundColor || 'unknown'}`);
        console.log(`   Body Text Color: ${page.bodyStyles?.color || 'unknown'}`);
        console.log(`   Issues (${page.issues.length}):`);
        page.issues.forEach((issue, idx) => {
          console.log(`     ${idx + 1}. ${issue.element}: ${issue.issue}`);
        });
      }
    });
  }
  
  console.log('\n✨ Inspection complete! Check screenshots and JSON report for details.');
  
  await browser.close();
  return report;
}

// Run the inspection
inspectFoundationPagesInDarkMode().catch(console.error);