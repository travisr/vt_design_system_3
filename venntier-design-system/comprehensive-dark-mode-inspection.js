const { chromium } = require('playwright');
const fs = require('fs');

async function comprehensiveDarkModeInspection() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set larger viewport to see more content
  await page.setViewportSize({ width: 1400, height: 900 });
  
  const foundationPages = [
    { name: 'colors', url: 'http://localhost:4200/foundation/colors', title: 'Colors & Themes' },
    { name: 'typography', url: 'http://localhost:4200/foundation/typography', title: 'Typography' },
    { name: 'icons', url: 'http://localhost:4200/foundation/icons', title: 'Icons' },
    { name: 'spacing', url: 'http://localhost:4200/foundation/spacing', title: 'Spacing & Layout' },
    { name: 'motion', url: 'http://localhost:4200/foundation/motion', title: 'Motion' }
  ];
  
  const allIssues = [];
  
  console.log('🌙 Starting Comprehensive Dark Mode Foundation Pages Inspection...\n');
  console.log('📏 Using larger viewport (1400x900) for better coverage\n');
  
  for (const foundationPage of foundationPages) {
    console.log(`📋 Inspecting ${foundationPage.title} page with full scrolling...`);
    
    try {
      // Navigate to the page
      await page.goto(foundationPage.url);
      await page.waitForSelector('app-root', { timeout: 10000 });
      
      // Switch to dark mode
      console.log(`  🌙 Switching to dark mode...`);
      const darkButton = await page.locator('button:has-text("Dark"), button:has-text("Toggle")').first();
      if (await darkButton.count() > 0) {
        await darkButton.click();
        await page.waitForTimeout(1000);
        console.log(`    ✅ Dark mode activated`);
      } else {
        console.log(`    ⚠️  Could not find theme toggle - checking if already in dark mode`);
      }
      
      // Check theme status
      const themeStatus = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        return {
          rootDataTheme: root.getAttribute('data-vt-theme'),
          rootClasses: root.className,
          bodyBg: getComputedStyle(body).backgroundColor,
          isDark: root.getAttribute('data-vt-theme') === 'dark' || root.classList.contains('vt-theme-dark')
        };
      });
      
      console.log(`    🎨 Theme status: ${themeStatus.isDark ? 'DARK' : 'LIGHT'} (body: ${themeStatus.bodyBg})`);
      
      // Get page height for scrolling
      const pageHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = 900;
      const scrollSteps = Math.ceil(pageHeight / viewportHeight * 2); // Extra steps for overlap
      
      console.log(`    📏 Page height: ${pageHeight}px, will take ${scrollSteps} scroll steps`);
      
      // Take screenshots at different scroll positions and analyze
      const scrollPositions = [];
      for (let step = 0; step <= scrollSteps; step++) {
        const scrollY = Math.min((step * viewportHeight * 0.7), pageHeight - viewportHeight); // 70% overlap
        await page.evaluate((y) => window.scrollTo(0, y), scrollY);
        await page.waitForTimeout(300);
        
        scrollPositions.push({
          step: step,
          scrollY: scrollY,
          screenshotPath: `./scroll-${foundationPage.name}-step-${step}.png`
        });
        
        // Take screenshot
        await page.screenshot({ 
          path: scrollPositions[step].screenshotPath,
          fullPage: false // Use viewport screenshots for consistent comparison
        });
        
        console.log(`    📸 Step ${step}: scrollY=${scrollY}px (screenshot saved)`);
      }
      
      // Reset scroll and analyze all elements
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      // Comprehensive element analysis
      const elementAnalysis = await page.evaluate(() => {
        const elementsToCheck = [
          { selector: '.mat-mdc-card', name: 'Material Cards' },
          { selector: '.mat-mdc-button', name: 'Material Buttons' },
          { selector: '.example-viewer', name: 'Example Viewers' },
          { selector: '.demo-example', name: 'Demo Examples' },
          { selector: '.demo-code', name: 'Code Blocks' },
          { selector: '.mat-mdc-tab-group', name: 'Tab Groups' },
          { selector: '.mat-mdc-tab-body-content', name: 'Tab Content' },
          { selector: '.page-header', name: 'Page Headers' },
          { selector: '.color-swatch', name: 'Color Swatches' },
          { selector: '.typography-example', name: 'Typography Examples' },
          { selector: '.spacing-example', name: 'Spacing Examples' },
          { selector: '.motion-box', name: 'Motion Boxes' },
          { selector: '.duration-box', name: 'Duration Boxes' },
          { selector: '.animation-card', name: 'Animation Cards' },
          { selector: 'pre', name: 'Code Pre Elements' },
          { selector: 'code', name: 'Code Elements' },
          { selector: '.mat-icon', name: 'Material Icons' },
          { selector: '[class*="surface"]', name: 'Surface Elements' },
          { selector: '[style*="background"]', name: 'Inline Background Styles' }
        ];
        
        const issues = [];
        
        elementsToCheck.forEach(({ selector, name }) => {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            elements.forEach((el, index) => {
              if (el.offsetWidth > 10 && el.offsetHeight > 10) { // Only visible elements
                const styles = getComputedStyle(el);
                const bg = styles.backgroundColor;
                const color = styles.color;
                const rect = el.getBoundingClientRect();
                
                // Check for problematic backgrounds in dark mode
                const hasWhiteBg = (
                  bg === 'rgb(255, 255, 255)' || 
                  bg === 'rgba(255, 255, 255, 1)' ||
                  bg === '#ffffff' ||
                  bg === 'white'
                );
                
                const hasLightGrayBg = (
                  bg.includes('rgb(2') && bg.includes(', 2') && !bg.includes('rgb(20') // Very light grays 250+
                );
                
                const hasDarkTextOnLightBg = (
                  hasWhiteBg && (color.includes('rgb(0') || color === 'black')
                );
                
                const hasLightTextOnLightBg = (
                  (hasWhiteBg || hasLightGrayBg) && 
                  (color.includes('rgb(24') || color.includes('rgb(25')) // Light text colors
                );
                
                const hasLowContrast = hasDarkTextOnLightBg || hasLightTextOnLightBg;
                
                if (hasWhiteBg || hasLightGrayBg || hasLowContrast) {
                  const issue = {
                    element: name,
                    selector: selector,
                    index: index,
                    position: {
                      x: Math.round(rect.left),
                      y: Math.round(rect.top),
                      width: Math.round(rect.width),
                      height: Math.round(rect.height)
                    },
                    styles: {
                      backgroundColor: bg,
                      color: color,
                      background: styles.background
                    },
                    issue: hasWhiteBg ? 'White background in dark mode' :
                           hasLightGrayBg ? 'Very light background in dark mode' :
                           hasDarkTextOnLightBg ? 'Dark text on light background' :
                           hasLightTextOnLightBg ? 'Light text on light background (poor contrast)' :
                           'Low contrast detected',
                    textContent: el.textContent?.trim().substring(0, 100) || '',
                    className: el.className || '',
                    tagName: el.tagName.toLowerCase()
                  };
                  
                  issues.push(issue);
                }
              }
            });
          }
        });
        
        return {
          totalElements: document.querySelectorAll('*').length,
          issuesFound: issues,
          pageTitle: document.title,
          url: window.location.href
        };
      });
      
      console.log(`    🔍 Analyzed ${elementAnalysis.totalElements} elements, found ${elementAnalysis.issuesFound.length} potential issues`);
      
      if (elementAnalysis.issuesFound.length > 0) {
        console.log(`    ⚠️  Issues found:`);
        const issueCounts = {};
        elementAnalysis.issuesFound.forEach(issue => {
          issueCounts[issue.element] = (issueCounts[issue.element] || 0) + 1;
        });
        Object.entries(issueCounts).forEach(([element, count]) => {
          console.log(`      - ${element}: ${count} problem(s)`);
        });
      }
      
      // Take final full page screenshot
      const fullScreenshotPath = `./full-dark-${foundationPage.name}.png`;
      await page.screenshot({ 
        path: fullScreenshotPath,
        fullPage: true 
      });
      console.log(`    📸 Full page screenshot: ${fullScreenshotPath}`);
      
      allIssues.push({
        page: foundationPage.name,
        title: foundationPage.title,
        url: foundationPage.url,
        themeStatus: themeStatus,
        pageHeight: pageHeight,
        scrollSteps: scrollSteps,
        scrollPositions: scrollPositions,
        fullScreenshot: fullScreenshotPath,
        elementAnalysis: elementAnalysis,
        timestamp: new Date().toISOString()
      });
      
      console.log(`    ✅ Completed comprehensive inspection of ${foundationPage.title}\n`);
      
    } catch (error) {
      console.log(`    ❌ Error inspecting ${foundationPage.title}:`, error.message);
      allIssues.push({
        page: foundationPage.name,
        title: foundationPage.title,
        url: foundationPage.url,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  // Generate comprehensive report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: foundationPages.length,
      pagesWithIssues: allIssues.filter(p => p.elementAnalysis && p.elementAnalysis.issuesFound.length > 0).length,
      totalIssues: allIssues.reduce((sum, p) => sum + (p.elementAnalysis ? p.elementAnalysis.issuesFound.length : 0), 0),
      viewport: { width: 1400, height: 900 }
    },
    pages: allIssues
  };
  
  // Save comprehensive report
  fs.writeFileSync('./comprehensive-dark-mode-report.json', JSON.stringify(report, null, 2));
  console.log('📊 Comprehensive report saved to comprehensive-dark-mode-report.json');
  
  // Print executive summary
  console.log('\n🎯 COMPREHENSIVE DARK MODE INSPECTION SUMMARY');
  console.log('==============================================');
  console.log(`Pages inspected: ${report.summary.totalPages}`);
  console.log(`Pages with issues: ${report.summary.pagesWithIssues}`);
  console.log(`Total issues found: ${report.summary.totalIssues}`);
  
  if (report.summary.totalIssues > 0) {
    console.log('\n🔍 DETAILED ISSUES BY PAGE:');
    console.log('============================');
    
    allIssues.forEach(page => {
      if (page.elementAnalysis && page.elementAnalysis.issuesFound.length > 0) {
        console.log(`\n📄 ${page.title.toUpperCase()}`);
        console.log(`   URL: ${page.url}`);
        console.log(`   Theme Applied: ${page.themeStatus?.isDark ? '✅ Yes' : '❌ No'}`);
        console.log(`   Issues Found: ${page.elementAnalysis.issuesFound.length}`);
        console.log(`   Full Screenshot: ${page.fullScreenshot}`);
        
        // Group issues by type
        const issuesByType = {};
        page.elementAnalysis.issuesFound.forEach(issue => {
          if (!issuesByType[issue.issue]) {
            issuesByType[issue.issue] = [];
          }
          issuesByType[issue.issue].push(issue);
        });
        
        Object.entries(issuesByType).forEach(([issueType, issues]) => {
          console.log(`\n   🚨 ${issueType} (${issues.length} instances):`);
          issues.slice(0, 5).forEach((issue, idx) => { // Show first 5 instances
            console.log(`     ${idx + 1}. ${issue.element} (${issue.tagName}.${issue.className})`);
            if (issue.textContent) {
              console.log(`        Content: "${issue.textContent.substring(0, 50)}..."`);
            }
            console.log(`        Colors: bg=${issue.styles.backgroundColor}, text=${issue.styles.color}`);
            console.log(`        Position: ${issue.position.width}×${issue.position.height}px at (${issue.position.x}, ${issue.position.y})`);
          });
          if (issues.length > 5) {
            console.log(`     ... and ${issues.length - 5} more instances`);
          }
        });
      } else if (page.elementAnalysis) {
        console.log(`\n📄 ${page.title.toUpperCase()}: ✅ No issues found`);
      }
    });
  }
  
  console.log('\n✨ Comprehensive inspection complete!');
  console.log('📁 Check all screenshots and the JSON report for detailed analysis.');
  console.log('🔧 Use this data to create a targeted fix plan.');
  
  await browser.close();
  return report;
}

// Run the comprehensive inspection
comprehensiveDarkModeInspection().catch(console.error);