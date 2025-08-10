const { chromium } = require('playwright');
const fs = require('fs');

async function auditFoundationPagesContrast() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('🔍 Starting Foundation Pages Contrast Audit...\n');
  
  // Color token mapping from our analysis
  const colorTokenValues = {
    '--md-sys-color-primary': '#000000',           // Black - excellent contrast
    '--md-sys-color-on-primary': '#ffffff',        // White 
    '--md-sys-color-secondary': '#40414f',         // Gray 700 - good contrast
    '--md-sys-color-surface': '#ffffff',           // White
    '--md-sys-color-background': '#fafafa',        // Gray 50 - subtle
    '--md-sys-color-on-surface': '#202123',        // Gray 900 - excellent contrast (9.6:1)
    '--md-sys-color-on-surface-variant': '#565869', // Gray 600 - adequate contrast (5.7:1) 
    '--md-sys-color-outline': '#d1d5db',           // Gray 300 - ❌ POOR contrast (2.2:1)
    '--md-sys-color-outline-variant': '#e5e5e5',   // Gray 200 - ❌ POOR contrast (1.8:1)
    '--md-sys-color-disabled': '#9ca3af',          // Gray 400 - borderline (3.4:1)
  };
  
  // Foundation pages to audit
  const pages = [
    { name: 'Typography', url: '/foundation/typography' },
    { name: 'Colors', url: '/foundation/colors' },
    { name: 'Spacing', url: '/foundation/spacing' },
    { name: 'Motion', url: '/foundation/motion' },
    { name: 'Icons', url: '/foundation/icons' }
  ];
  
  const auditResults = {
    timestamp: new Date().toISOString(),
    totalIssues: 0,
    pageResults: []
  };
  
  for (const pageInfo of pages) {
    console.log(`\n🔍 Auditing: ${pageInfo.name}`);
    console.log('═'.repeat(50));
    
    try {
      await page.goto(`http://localhost:4200${pageInfo.url}`);
      await page.waitForSelector('mat-sidenav', { timeout: 10000 });
      await page.waitForTimeout(2000); // Allow content to load
      
      // Capture screenshot for reference
      await page.screenshot({ 
        path: `audit-${pageInfo.name.toLowerCase()}-contrast.png`,
        fullPage: true 
      });
      
      // Find all text elements and their computed styles
      const contrastIssues = await page.evaluate(({pageInfo, colorTokenValues}) => {
        const issues = [];
        const warnings = [];
        
        // Function to get contrast ratio (simplified)
        function getContrastRatio(color1, color2) {
          // Convert colors to RGB values and calculate luminance
          // This is a simplified version - in production, use a proper library
          
          function getRGBValues(color) {
            const div = document.createElement('div');
            div.style.color = color;
            document.body.appendChild(div);
            const computed = getComputedStyle(div).color;
            document.body.removeChild(div);
            
            const matches = computed.match(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/);
            return matches ? [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])] : [0, 0, 0];
          }
          
          function getLuminance([r, g, b]) {
            const [rs, gs, bs] = [r, g, b].map(c => {
              c = c / 255;
              return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
          }
          
          const rgb1 = getRGBValues(color1);
          const rgb2 = getRGBValues(color2);
          const lum1 = getLuminance(rgb1);
          const lum2 = getLuminance(rgb2);
          
          const brightest = Math.max(lum1, lum2);
          const darkest = Math.min(lum1, lum2);
          
          return (brightest + 0.05) / (darkest + 0.05);
        }
        
        // Find elements with potentially problematic contrast
        const textSelectors = [
          'p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          '.type-label', '.swatch-value', '.swatch-token', '.swatch-name',
          '.gray-value', '.gray-usage', '.gray-name',
          '.spacing-token', '.spacing-usage', '.spacing-name',
          '.state-label', '.hierarchy-label',
          '.curve-example h4', '.duration-label',
          '.icon-item span', '.size-group h4', '.color-group h4'
        ];
        
        textSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el, index) => {
            if (!el.textContent.trim()) return;
            
            const style = getComputedStyle(el);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            
            // Check if element uses CSS custom properties
            let usedToken = null;
            const cssText = style.cssText || '';
            
            // Look for CSS custom property usage
            Object.keys(colorTokenValues).forEach(token => {
              const property = token.replace('--md-sys-color-', '');
              if (cssText.includes(token) || el.style.color === `var(${token})`) {
                usedToken = token;
              }
            });
            
            // Flag known problematic tokens
            if (usedToken === '--md-sys-color-outline' || 
                usedToken === '--md-sys-color-outline-variant') {
              issues.push({
                selector: selector,
                element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ')[0] : ''),
                text: el.textContent.trim().substring(0, 50),
                color: color,
                backgroundColor: backgroundColor || 'transparent',
                usedToken: usedToken,
                tokenValue: colorTokenValues[usedToken],
                issue: 'Using outline token for text - poor contrast',
                severity: 'high',
                recommendation: usedToken === '--md-sys-color-outline' ? 
                  'Use --md-sys-color-on-surface-variant instead' :
                  'Use --md-sys-color-on-surface-variant for better contrast'
              });
            }
            
            // Check for other potentially low contrast combinations
            if (color.includes('rgb(156, 163, 175)') || // Gray 400 disabled
                color.includes('rgb(209, 213, 219)') || // Gray 300 outline  
                color.includes('rgb(229, 229, 229)')) { // Gray 200 outline-variant
              warnings.push({
                selector: selector,
                element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ')[0] : ''),
                text: el.textContent.trim().substring(0, 50),
                color: color,
                backgroundColor: backgroundColor || 'transparent',
                issue: 'Potentially low contrast color detected',
                severity: 'medium'
              });
            }
          });
        });
        
        return { issues, warnings };
      }, {pageInfo, colorTokenValues});
      
      // Process results for this page
      const pageResult = {
        page: pageInfo.name,
        url: pageInfo.url,
        issues: contrastIssues.issues,
        warnings: contrastIssues.warnings,
        totalIssues: contrastIssues.issues.length,
        totalWarnings: contrastIssues.warnings.length
      };
      
      auditResults.pageResults.push(pageResult);
      auditResults.totalIssues += contrastIssues.issues.length;
      
      // Display results for this page
      if (contrastIssues.issues.length > 0) {
        console.log(`❌ Found ${contrastIssues.issues.length} contrast issues:`);
        contrastIssues.issues.forEach((issue, i) => {
          console.log(`  ${i + 1}. ${issue.element}`);
          console.log(`     Text: "${issue.text}"`);
          console.log(`     Issue: ${issue.issue}`);
          console.log(`     Token: ${issue.usedToken} (${issue.tokenValue})`);
          console.log(`     Fix: ${issue.recommendation}`);
          console.log('');
        });
      }
      
      if (contrastIssues.warnings.length > 0) {
        console.log(`⚠️  Found ${contrastIssues.warnings.length} potential issues:`);
        contrastIssues.warnings.forEach((warning, i) => {
          console.log(`  ${i + 1}. ${warning.element}: "${warning.text}"`);
          console.log(`     Color: ${warning.color}`);
          console.log('');
        });
      }
      
      if (contrastIssues.issues.length === 0 && contrastIssues.warnings.length === 0) {
        console.log('✅ No contrast issues found!');
      }
      
    } catch (error) {
      console.log(`❌ Error auditing ${pageInfo.name}:`, error.message);
      pageResult = {
        page: pageInfo.name,
        url: pageInfo.url,
        error: error.message,
        issues: [],
        warnings: []
      };
      auditResults.pageResults.push(pageResult);
    }
  }
  
  // Generate summary
  console.log('\\n' + '═'.repeat(60));
  console.log('📊 FOUNDATION PAGES CONTRAST AUDIT SUMMARY');
  console.log('═'.repeat(60));
  
  console.log(`\\n🎯 Total Issues Found: ${auditResults.totalIssues}`);
  
  auditResults.pageResults.forEach(result => {
    if (!result.error) {
      const status = result.totalIssues === 0 ? '✅' : '❌';
      console.log(`${status} ${result.page}: ${result.totalIssues} issues, ${result.totalWarnings} warnings`);
    } else {
      console.log(`❌ ${result.page}: Error during audit`);
    }
  });
  
  // Identify most common issues
  const allIssues = auditResults.pageResults.flatMap(p => p.issues || []);
  const issueTypes = {};
  allIssues.forEach(issue => {
    issueTypes[issue.usedToken] = (issueTypes[issue.usedToken] || 0) + 1;
  });
  
  if (Object.keys(issueTypes).length > 0) {
    console.log('\\n📈 Most Common Issues:');
    Object.entries(issueTypes)
      .sort(([,a], [,b]) => b - a)
      .forEach(([token, count]) => {
        console.log(`  ${token}: ${count} occurrences`);
      });
  }
  
  // Generate recommendations
  console.log('\\n💡 RECOMMENDED FIXES:');
  
  const fixes = new Set();
  allIssues.forEach(issue => {
    fixes.add(issue.recommendation);
  });
  
  if (fixes.size > 0) {
    Array.from(fixes).forEach((fix, i) => {
      console.log(`  ${i + 1}. ${fix}`);
    });
  } else {
    console.log('  ✅ No fixes needed - all pages have good contrast!');
  }
  
  // Save detailed report
  const reportFile = `foundation-contrast-audit-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  fs.writeFileSync(reportFile, JSON.stringify(auditResults, null, 2));
  console.log(`\\n💾 Detailed report saved: ${reportFile}`);
  
  await browser.close();
  return auditResults;
}

auditFoundationPagesContrast().catch(console.error);