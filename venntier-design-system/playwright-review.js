const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Create screenshots directory
const screenshotsDir = path.join(__dirname, 'review-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function captureAndAnalyze() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  const findings = {
    general: [],
    typography: [],
    colors: [],
    spacing: [],
    motion: [],
    icons: [],
    navigation: [],
    styleIssues: [],
    uxIssues: []
  };

  try {
    console.log('Starting comprehensive review of Venntier Design System Demo...\n');

    // Navigate to home
    await page.goto('http://localhost:4200', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Capture main layout
    await page.screenshot({ 
      path: path.join(screenshotsDir, '00-main-layout.png'),
      fullPage: true 
    });

    // Check navigation sidebar
    console.log('Analyzing navigation sidebar...');
    const sidebar = await page.locator('mat-sidenav').first();
    const sidebarVisible = await sidebar.isVisible();
    
    if (!sidebarVisible) {
      findings.navigation.push('❌ Sidebar not visible on initial load');
    }

    // Check theme
    const bodyBg = await page.evaluate(() => {
      const body = document.body;
      return window.getComputedStyle(body).backgroundColor;
    });
    console.log(`Body background color: ${bodyBg}`);

    // Get all navigation items
    const navItems = await page.locator('mat-nav-list a').all();
    console.log(`Found ${navItems.length} navigation items\n`);

    // Test each Foundation page
    const foundationPages = [
      { name: 'Typography', path: '/foundation/typography' },
      { name: 'Colors', path: '/foundation/colors' },
      { name: 'Spacing', path: '/foundation/spacing' },
      { name: 'Motion', path: '/foundation/motion' },
      { name: 'Icons', path: '/foundation/icons' }
    ];

    for (const pageInfo of foundationPages) {
      console.log(`\n📄 Analyzing ${pageInfo.name} page...`);
      await page.goto(`http://localhost:4200${pageInfo.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);

      // Screenshot
      await page.screenshot({ 
        path: path.join(screenshotsDir, `${pageInfo.name.toLowerCase()}-full.png`),
        fullPage: true 
      });

      // Analyze page header
      const pageHeader = await page.locator('demo-page-header').first();
      if (await pageHeader.isVisible()) {
        const headerStyles = await pageHeader.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            marginBottom: styles.marginBottom,
            paddingBottom: styles.paddingBottom,
            borderBottom: styles.borderBottom
          };
        });
        console.log(`  Header styles:`, headerStyles);
      } else {
        findings[pageInfo.name.toLowerCase()].push('❌ Page header not visible');
      }

      // Check for CSS variables usage
      const cssVarUsage = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        let varCount = 0;
        let hardcodedCount = 0;
        const issues = [];

        allElements.forEach(el => {
          const styles = window.getComputedStyle(el);
          const styleStr = styles.cssText;
          
          // Check for CSS variables
          if (styleStr.includes('var(--md-sys-')) {
            varCount++;
          }
          
          // Check for hardcoded values (common anti-patterns)
          if (styleStr.includes('px') && !styleStr.includes('var(')) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              // Check for hardcoded colors
              if (styles.color && !styles.color.includes('var(') && 
                  !styles.color.includes('inherit') && 
                  !styles.color.includes('transparent')) {
                issues.push({
                  element: el.tagName,
                  issue: 'hardcoded color',
                  value: styles.color
                });
              }
              
              // Check for hardcoded spacing
              if (styles.padding && styles.padding.includes('px') && 
                  !styles.padding.includes('var(')) {
                hardcodedCount++;
              }
            }
          }
        });

        return { varCount, hardcodedCount, issues: issues.slice(0, 5) };
      });

      console.log(`  CSS variable usage: ${cssVarUsage.varCount} elements using vars`);
      if (cssVarUsage.hardcodedCount > 0) {
        console.log(`  ⚠️  Found ${cssVarUsage.hardcodedCount} elements with hardcoded spacing`);
        findings.styleIssues.push(`${pageInfo.name}: ${cssVarUsage.hardcodedCount} hardcoded values`);
      }

      // Page-specific checks
      if (pageInfo.name === 'Typography') {
        const typographyElements = await page.locator('.typography-example').all();
        console.log(`  Found ${typographyElements.length} typography examples`);
        
        // Check font loading
        const fontFamily = await page.evaluate(() => {
          const h1 = document.querySelector('h1');
          return h1 ? window.getComputedStyle(h1).fontFamily : null;
        });
        console.log(`  H1 font family: ${fontFamily}`);
        
        if (!fontFamily?.includes('Inter')) {
          findings.typography.push('⚠️  Inter font may not be loading correctly');
        }
      }

      if (pageInfo.name === 'Colors') {
        const colorSwatches = await page.locator('.color-swatch, .color-tile').all();
        console.log(`  Found ${colorSwatches.length} color swatches`);
        
        // Check if theme toggle works
        const themeToggle = await page.locator('button:has-text("dark_mode"), button:has-text("light_mode")').first();
        if (await themeToggle.isVisible()) {
          await themeToggle.click();
          await page.waitForTimeout(500);
          const newBodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
          if (newBodyBg === bodyBg) {
            findings.colors.push('❌ Theme toggle not working - background color unchanged');
          } else {
            console.log('  ✅ Theme toggle working');
          }
          // Toggle back
          await themeToggle.click();
          await page.waitForTimeout(500);
        } else {
          findings.colors.push('⚠️  No theme toggle button found');
        }
      }

      if (pageInfo.name === 'Spacing') {
        const spacingExamples = await page.locator('.spacing-example, .spacing-demo').all();
        console.log(`  Found ${spacingExamples.length} spacing examples`);
        
        // Check if using 8px grid
        const spacingValues = await page.evaluate(() => {
          const examples = document.querySelectorAll('[class*="spacing"]');
          const values = new Set();
          examples.forEach(el => {
            const styles = window.getComputedStyle(el);
            ['padding', 'margin', 'gap'].forEach(prop => {
              const value = styles[prop];
              if (value && value !== '0px') values.add(value);
            });
          });
          return Array.from(values);
        });
        
        const non8pxValues = spacingValues.filter(v => {
          const num = parseInt(v);
          return num % 8 !== 0;
        });
        
        if (non8pxValues.length > 0) {
          findings.spacing.push(`⚠️  Non-8px grid values found: ${non8pxValues.join(', ')}`);
        }
      }

      if (pageInfo.name === 'Motion') {
        const animationButtons = await page.locator('button:has-text("Animate")').all();
        console.log(`  Found ${animationButtons.length} animation triggers`);
        
        if (animationButtons.length > 0) {
          // Test first animation
          await animationButtons[0].click();
          await page.waitForTimeout(1000);
          console.log('  ✅ Motion examples interactive');
        }
      }

      if (pageInfo.name === 'Icons') {
        const icons = await page.locator('mat-icon').all();
        console.log(`  Found ${icons.length} icons`);
        
        // Check icon rendering
        if (icons.length > 0) {
          const iconContent = await icons[0].textContent();
          if (iconContent?.includes('_')) {
            findings.icons.push('⚠️  Icons showing ligature text instead of rendering');
          }
        }
      }
    }

    // Test responsive behavior
    console.log('\n📱 Testing responsive behavior...');
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto('http://localhost:4200/foundation/typography', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'responsive-tablet.png'),
      fullPage: true 
    });

    // Check if sidebar becomes overlay
    const sidebarMode = await page.evaluate(() => {
      const sidebar = document.querySelector('mat-sidenav');
      return sidebar ? window.getComputedStyle(sidebar).position : null;
    });
    console.log(`Sidebar position at 768px: ${sidebarMode}`);

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'responsive-mobile.png'),
      fullPage: true 
    });

    // Analyze overall UX issues
    console.log('\n🎨 Analyzing UX/UI Quality...');

    // Check contrast ratios
    const contrastIssues = await page.evaluate(() => {
      const issues = [];
      const elements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const color = styles.color;
        const bg = styles.backgroundColor;
        
        // Simple contrast check (would need proper WCAG calculation)
        if (color.includes('rgb') && bg.includes('rgb')) {
          const colorMatch = color.match(/\d+/g);
          const bgMatch = bg.match(/\d+/g);
          if (colorMatch && bgMatch) {
            const colorLum = (parseInt(colorMatch[0]) + parseInt(colorMatch[1]) + parseInt(colorMatch[2])) / 3;
            const bgLum = (parseInt(bgMatch[0]) + parseInt(bgMatch[1]) + parseInt(bgMatch[2])) / 3;
            const contrast = Math.abs(colorLum - bgLum);
            if (contrast < 50) {
              issues.push({
                text: el.textContent?.substring(0, 30),
                contrast: contrast
              });
            }
          }
        }
      });
      
      return issues.slice(0, 3);
    });

    if (contrastIssues.length > 0) {
      findings.uxIssues.push(`Low contrast text found: ${contrastIssues.length} instances`);
    }

    // Check interactive elements
    const buttons = await page.locator('button').all();
    const interactiveStates = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      const issues = [];
      
      buttons.forEach(btn => {
        const styles = window.getComputedStyle(btn);
        if (!styles.cursor || styles.cursor === 'auto') {
          issues.push('Button missing pointer cursor');
        }
        if (!styles.transition && !styles.animation) {
          issues.push('Button missing transition effects');
        }
      });
      
      return issues.slice(0, 3);
    });

    if (interactiveStates.length > 0) {
      findings.uxIssues.push(...interactiveStates);
    }

  } catch (error) {
    console.error('Error during analysis:', error);
    findings.general.push(`Error: ${error.message}`);
  } finally {
    await browser.close();
  }

  // Generate report
  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPREHENSIVE REVIEW REPORT');
  console.log('='.repeat(60));

  const allIssues = [
    ...findings.general,
    ...findings.typography,
    ...findings.colors,
    ...findings.spacing,
    ...findings.motion,
    ...findings.icons,
    ...findings.navigation,
    ...findings.styleIssues,
    ...findings.uxIssues
  ];

  if (allIssues.length === 0) {
    console.log('\n✅ No critical issues found!');
  } else {
    console.log('\n🔍 Issues Found:\n');
    Object.entries(findings).forEach(([category, issues]) => {
      if (issues.length > 0) {
        console.log(`\n${category.toUpperCase()}:`);
        issues.forEach(issue => console.log(`  - ${issue}`));
      }
    });
  }

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    findings,
    summary: {
      totalIssues: allIssues.length,
      criticalIssues: allIssues.filter(i => i.includes('❌')).length,
      warnings: allIssues.filter(i => i.includes('⚠️')).length
    }
  };

  fs.writeFileSync(
    path.join(screenshotsDir, 'review-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📁 Screenshots and report saved to review-screenshots/');

  return report;
}

// Run the analysis
captureAndAnalyze().catch(console.error);