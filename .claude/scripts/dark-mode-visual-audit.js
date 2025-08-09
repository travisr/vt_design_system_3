#!/usr/bin/env node

/**
 * Dark Mode Visual Audit Script
 * 
 * This script performs comprehensive dark mode testing using Playwright.
 * It checks for contrast issues, invisible text, and poor hierarchy.
 * 
 * Usage: node dark-mode-visual-audit.js [--headless] [--url=http://localhost:4200]
 */

// Try to find playwright in different locations
let playwright;
try {
  playwright = require('playwright');
} catch (e) {
  try {
    // Try relative to venntier-design-system directory
    playwright = require('../../venntier-design-system/node_modules/playwright');
  } catch (e2) {
    console.error('Error: Playwright not found. Please install it with: npm install --save-dev playwright');
    process.exit(1);
  }
}
const { chromium } = playwright;
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  headless: process.argv.includes('--headless'),
  baseUrl: process.argv.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'http://localhost:4200',
  screenshotDir: './audits/darkmode-screenshots',
  reportFile: './audits/darkmode-audit-report.md'
};

// Pages to test
const pagesToTest = [
  { path: '/', name: 'Home' },
  { path: '/foundation/colors', name: 'Colors' },
  { path: '/foundation/typography', name: 'Typography' },
  { path: '/foundation/spacing', name: 'Spacing' },
  { path: '/foundation/icons', name: 'Icons' },
  { path: '/foundation/motion', name: 'Motion' },
  { path: '/actions/buttons', name: 'Buttons' },
  { path: '/actions/chips', name: 'Chips' },
  { path: '/actions/fab', name: 'FAB' },
  { path: '/actions/icon-buttons', name: 'Icon Buttons' },
  { path: '/actions/segmented-buttons', name: 'Segmented Buttons' }
];

// Utility functions
function initReport() {
  // Create screenshot directory
  if (!fs.existsSync(config.screenshotDir)) {
    fs.mkdirSync(config.screenshotDir, { recursive: true });
  }
  
  // Initialize report
  let report = `# Dark Mode Visual Audit Report\n\n`;
  report += `Generated: ${new Date().toISOString()}\n`;
  report += `Base URL: ${config.baseUrl}\n\n`;
  
  return report;
}

function calculateContrast(rgb1, rgb2) {
  // Simple contrast calculation (not WCAG compliant, but good for quick checks)
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const parseRgb = (rgb) => {
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  };
  
  const color1 = parseRgb(rgb1);
  const color2 = parseRgb(rgb2);
  
  if (!color1 || !color2) return null;
  
  const l1 = getLuminance(...color1);
  const l2 = getLuminance(...color2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

async function auditPage(page, pageInfo) {
  const issues = [];
  
  // Navigate to page
  await page.goto(`${config.baseUrl}${pageInfo.path}`);
  await page.waitForSelector('app-root', { timeout: 10000 });
  
  // Switch to dark mode
  const darkModeButton = await page.locator('button:has-text("Dark")').first();
  if (await darkModeButton.count() > 0) {
    await darkModeButton.click();
    await page.waitForTimeout(500);
  }
  
  // Audit function to run in browser
  const auditResults = await page.evaluate(() => {
    const issues = [];
    
    // Check all elements with inline styles
    const elementsWithStyles = document.querySelectorAll('[style]');
    
    elementsWithStyles.forEach(el => {
      const style = el.getAttribute('style');
      const computed = getComputedStyle(el);
      
      // Check for background without text color
      if (style.includes('background') && !style.includes('color:')) {
        issues.push({
          type: 'missing-color',
          element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ')[0] : ''),
          style: style.substring(0, 100),
          severity: 'high'
        });
      }
      
      // Check for hardcoded colors
      if (style.match(/#[0-9a-fA-F]{3,8}|rgb|white|black/i) && !style.includes('var(--')) {
        issues.push({
          type: 'hardcoded-color',
          element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ')[0] : ''),
          style: style.substring(0, 100),
          severity: 'critical'
        });
      }
      
      // Check for poor contrast (simple check)
      const bg = computed.backgroundColor;
      const color = computed.color;
      const parent = el.parentElement;
      
      if (parent && bg !== 'rgba(0, 0, 0, 0)') {
        const parentBg = getComputedStyle(parent).backgroundColor;
        
        // Check if background is too similar to parent
        if (bg === parentBg && bg.includes('rgb')) {
          issues.push({
            type: 'poor-hierarchy',
            element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ')[0] : ''),
            background: bg,
            parentBackground: parentBg,
            severity: 'medium'
          });
        }
      }
      
      // Check for invisible text
      if (color === bg || color === 'rgba(0, 0, 0, 0)') {
        issues.push({
          type: 'invisible-text',
          element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ')[0] : ''),
          color: color,
          background: bg,
          severity: 'critical'
        });
      }
    });
    
    // Check for nested surfaces
    const surfaces = document.querySelectorAll('[style*="surface"]');
    surfaces.forEach(el => {
      const style = el.getAttribute('style');
      const children = el.querySelectorAll('[style*="surface"]');
      
      if (children.length > 0 && style.includes('var(--md-sys-color-surface)')) {
        children.forEach(child => {
          const childStyle = child.getAttribute('style');
          if (childStyle.includes('var(--md-sys-color-surface)')) {
            issues.push({
              type: 'nested-same-surface',
              parent: el.tagName.toLowerCase(),
              child: child.tagName.toLowerCase(),
              severity: 'high'
            });
          }
        });
      }
    });
    
    return issues;
  });
  
  // Take screenshot
  const screenshotPath = path.join(config.screenshotDir, `${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}-dark.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  
  return {
    page: pageInfo.name,
    path: pageInfo.path,
    issues: auditResults,
    screenshot: screenshotPath
  };
}

async function runAudit() {
  console.log('🌙 Starting Dark Mode Visual Audit...\n');
  
  const browser = await chromium.launch({ headless: config.headless });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  
  let report = initReport();
  const results = [];
  let totalIssues = 0;
  
  // Test each page
  for (const pageInfo of pagesToTest) {
    console.log(`Testing ${pageInfo.name}...`);
    
    try {
      const result = await auditPage(page, pageInfo);
      results.push(result);
      totalIssues += result.issues.length;
      
      // Add to report
      report += `## ${result.page}\n`;
      report += `Path: \`${result.path}\`\n`;
      report += `Screenshot: [View](${path.basename(result.screenshot)})\n\n`;
      
      if (result.issues.length === 0) {
        report += '✅ **No issues found**\n\n';
      } else {
        report += `⚠️ **Found ${result.issues.length} issues:**\n\n`;
        
        // Group by severity
        const critical = result.issues.filter(i => i.severity === 'critical');
        const high = result.issues.filter(i => i.severity === 'high');
        const medium = result.issues.filter(i => i.severity === 'medium');
        
        if (critical.length > 0) {
          report += '### 🔴 Critical\n';
          critical.forEach(issue => {
            report += `- **${issue.type}**: ${issue.element || issue.style || 'Details in console'}\n`;
          });
          report += '\n';
        }
        
        if (high.length > 0) {
          report += '### 🟠 High\n';
          high.forEach(issue => {
            report += `- **${issue.type}**: ${issue.element || issue.style || 'Details in console'}\n`;
          });
          report += '\n';
        }
        
        if (medium.length > 0) {
          report += '### 🟡 Medium\n';
          medium.forEach(issue => {
            report += `- **${issue.type}**: ${issue.element || issue.style || 'Details in console'}\n`;
          });
          report += '\n';
        }
      }
      
      console.log(`  ${result.issues.length === 0 ? '✅' : '⚠️'} ${result.issues.length} issues found`);
      
    } catch (error) {
      console.error(`  ❌ Error testing ${pageInfo.name}: ${error.message}`);
      report += `❌ **Error testing page**: ${error.message}\n\n`;
    }
  }
  
  // Summary
  report += `## Summary\n\n`;
  report += `- **Total Pages Tested**: ${results.length}\n`;
  report += `- **Total Issues Found**: ${totalIssues}\n`;
  report += `- **Screenshots**: Saved to \`${config.screenshotDir}/\`\n\n`;
  
  if (totalIssues === 0) {
    report += '### 🎉 All pages pass dark mode audit!\n';
  } else {
    report += '### 🔧 Fixes needed:\n\n';
    report += '1. Replace hardcoded colors with MD3 tokens\n';
    report += '2. Ensure proper surface hierarchy (use container variants)\n';
    report += '3. Always pair background with text color\n';
    report += '4. Test contrast ratios meet WCAG standards\n';
  }
  
  // Write report
  fs.writeFileSync(config.reportFile, report);
  console.log(`\n📄 Report saved to: ${config.reportFile}`);
  console.log(`📸 Screenshots saved to: ${config.screenshotDir}/`);
  
  await browser.close();
  
  // Exit with error code if issues found
  process.exit(totalIssues > 0 ? 1 : 0);
}

// Run the audit
runAudit().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});