const { chromium } = require('playwright');
const fs = require('fs');

async function evaluateColorsPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport for desktop evaluation
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('🎨 Starting Colors Page UI/UX Evaluation...\n');
  
  try {
    await page.goto('http://localhost:4200/foundation/colors');
    await page.waitForSelector('mat-sidenav', { timeout: 10000 });
    
    // Wait for the colors page to load
    await page.waitForTimeout(2000); // Allow route to load and components to render
    await page.waitForTimeout(1000); // Allow animations to settle
    
    // Capture full page screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `colors-evaluation-${timestamp}.png`, 
      fullPage: true 
    });
    
    console.log('📸 Captured colors page screenshot\n');
    
    // === AESTHETIC ANALYSIS ===
    console.log('=== 🎨 AESTHETIC ANALYSIS ===');
    
    // Color palette extraction
    const colorPalette = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        primary: style.getPropertyValue('--md-sys-color-primary'),
        primaryContainer: style.getPropertyValue('--md-sys-color-primary-container'),
        secondary: style.getPropertyValue('--md-sys-color-secondary'),
        surface: style.getPropertyValue('--md-sys-color-surface'),
        surfaceContainer: style.getPropertyValue('--md-sys-color-surface-container'),
        background: style.getPropertyValue('--md-sys-color-background'),
        onSurface: style.getPropertyValue('--md-sys-color-on-surface'),
        outline: style.getPropertyValue('--md-sys-color-outline')
      };
    });
    
    console.log('Color Token Values:');
    Object.entries(colorPalette).forEach(([key, value]) => {
      console.log(`  ${key}: ${value.trim()}`);
    });
    
    // Visual hierarchy assessment
    const visualHierarchy = await page.evaluate(() => {
      const cards = document.querySelectorAll('mat-card');
      const headings = document.querySelectorAll('h1, h2, h3, h4');
      const backgrounds = [];
      
      cards.forEach(card => {
        backgrounds.push(getComputedStyle(card).backgroundColor);
      });
      
      return {
        cardCount: cards.length,
        headingCount: headings.length,
        uniqueBackgrounds: [...new Set(backgrounds)],
        pageStructure: document.querySelector('.colors-page, main')?.className || 'unknown'
      };
    });
    
    console.log('\\nVisual Hierarchy:');
    console.log(`  Cards found: ${visualHierarchy.cardCount}`);
    console.log(`  Headings found: ${visualHierarchy.headingCount}`);
    console.log(`  Unique backgrounds: ${visualHierarchy.uniqueBackgrounds.length}`);
    
    // === STYLING COMPLIANCE ===
    console.log('\\n=== 📏 STYLING BEST PRACTICES ===');
    
    const stylingCompliance = await page.evaluate(() => {
      const issues = [];
      const recommendations = [];
      
      // Check for harsh whites
      const elements = document.querySelectorAll('*');
      let harshWhiteCount = 0;
      elements.forEach(el => {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg === 'rgb(255, 255, 255)') harshWhiteCount++;
      });
      
      // Check spacing consistency
      const cards = document.querySelectorAll('mat-card');
      const paddings = [];
      cards.forEach(card => {
        const style = getComputedStyle(card);
        paddings.push(style.padding);
      });
      
      // Check font weights
      const textElements = document.querySelectorAll('h1, h2, h3, h4, p, span');
      const fontWeights = [];
      textElements.forEach(el => {
        fontWeights.push(getComputedStyle(el).fontWeight);
      });
      
      // Check color swatches organization
      const colorSwatches = document.querySelectorAll('[class*="color"], [class*="swatch"]');
      
      return {
        harshWhiteElements: harshWhiteCount,
        cardPaddings: [...new Set(paddings)],
        fontWeights: [...new Set(fontWeights)],
        colorSwatchCount: colorSwatches.length,
        hasProperSpacing: paddings.length > 0,
        usesSystemColors: document.documentElement.style.getPropertyValue('--md-sys-color-primary') !== ''
      };
    });
    
    console.log('Styling Assessment:');
    console.log(`  Harsh white elements: ${stylingCompliance.harshWhiteElements}`);
    console.log(`  Card padding variations: ${stylingCompliance.cardPaddings.length}`);
    console.log(`  Font weight variations: ${stylingCompliance.fontWeights.join(', ')}`);
    console.log(`  Color swatches found: ${stylingCompliance.colorSwatchCount}`);
    console.log(`  Uses MD3 tokens: ${stylingCompliance.usesSystemColors ? 'Yes' : 'No'}`);
    
    // === USABILITY ANALYSIS ===
    console.log('\\n=== 🎯 USABILITY ANALYSIS ===');
    
    const usabilityMetrics = await page.evaluate(() => {
      const metrics = {
        readability: {},
        accessibility: {},
        interactivity: {}
      };
      
      // Text contrast checking
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, span');
      let contrastIssues = 0;
      
      textElements.forEach(el => {
        const style = getComputedStyle(el);
        const color = style.color;
        const bg = style.backgroundColor;
        
        // Simple heuristic - if both are very light or very dark
        if ((color.includes('255') && bg.includes('255')) || 
            (color.includes('0, 0, 0') && bg.includes('0, 0, 0'))) {
          contrastIssues++;
        }
      });
      
      // Interactive elements
      const clickableElements = document.querySelectorAll('button, [role="button"], a');
      const hasHoverStates = Array.from(clickableElements).some(el => {
        return getComputedStyle(el, ':hover').cursor === 'pointer';
      });
      
      // Layout responsiveness indicators
      const containerWidth = document.documentElement.scrollWidth;
      const hasFlexLayout = document.querySelector('[style*="display: flex"], .flex');
      const hasGridLayout = document.querySelector('[style*="display: grid"], .grid');
      
      return {
        potentialContrastIssues: contrastIssues,
        interactiveElements: clickableElements.length,
        hasHoverStates,
        contentWidth: containerWidth,
        usesModernLayout: hasFlexLayout || hasGridLayout,
        scrollHeight: document.documentElement.scrollHeight
      };
    });
    
    console.log('Usability Metrics:');
    console.log(`  Potential contrast issues: ${usabilityMetrics.potentialContrastIssues}`);
    console.log(`  Interactive elements: ${usabilityMetrics.interactiveElements}`);
    console.log(`  Has hover states: ${usabilityMetrics.hasHoverStates}`);
    console.log(`  Content width: ${usabilityMetrics.contentWidth}px`);
    console.log(`  Uses modern layout: ${usabilityMetrics.usesModernLayout}`);
    console.log(`  Page height: ${usabilityMetrics.scrollHeight}px`);
    
    // === COMPREHENSIVE ASSESSMENT ===
    console.log('\\n=== 📊 SENIOR UI/UX DEVELOPER ASSESSMENT ===');
    
    const assessment = {
      aesthetic: {
        score: 0,
        issues: [],
        recommendations: []
      },
      styling: {
        score: 0,
        issues: [],
        recommendations: []
      },
      usability: {
        score: 0,
        issues: [],
        recommendations: []
      }
    };
    
    // Aesthetic scoring
    if (stylingCompliance.harshWhiteElements > 10) {
      assessment.aesthetic.issues.push('Too many harsh white backgrounds - use softer tones like #fafafa');
      assessment.aesthetic.score -= 2;
    }
    
    if (visualHierarchy.uniqueBackgrounds.length < 2) {
      assessment.aesthetic.issues.push('Insufficient visual hierarchy through background variations');
      assessment.aesthetic.score -= 1;
    }
    
    assessment.aesthetic.score += 5; // Base score
    
    // Styling scoring  
    if (stylingCompliance.fontWeights.includes('700') || stylingCompliance.fontWeights.includes('800')) {
      assessment.styling.issues.push('Font weights too heavy - OpenAI uses lighter weights (200-450)');
      assessment.styling.score -= 1;
    }
    
    if (!stylingCompliance.usesSystemColors) {
      assessment.styling.issues.push('Not using Material Design 3 system color tokens');
      assessment.styling.score -= 2;
    }
    
    assessment.styling.score += 5; // Base score
    
    // Usability scoring
    if (usabilityMetrics.potentialContrastIssues > 5) {
      assessment.usability.issues.push('Potential text contrast issues detected');
      assessment.usability.score -= 1;
    }
    
    if (!usabilityMetrics.hasHoverStates) {
      assessment.usability.issues.push('Missing hover states on interactive elements');
      assessment.usability.score -= 1;
    }
    
    if (usabilityMetrics.scrollHeight > 2000) {
      assessment.usability.issues.push('Page might be too long - consider pagination or sections');
      assessment.usability.score -= 0.5;
    }
    
    assessment.usability.score += 5; // Base score
    
    // Generate recommendations
    assessment.aesthetic.recommendations = [
      'Use #fafafa for body backgrounds instead of harsh white',
      'Implement subtle background hierarchy: body (#fafafa) → cards (#ffffff) → inputs (#f9f9f9)',
      'Consider adding subtle shadows or borders instead of pure elevation'
    ];
    
    assessment.styling.recommendations = [
      'Reduce font weights: Display 200-300, Body 400, Labels 400-450',
      'Ensure all colors use MD3 tokens (--md-sys-color-*)',
      'Implement 8px spacing grid throughout',
      'Use monochromatic interaction states (grays only)'
    ];
    
    assessment.usability.recommendations = [
      'Add subtle hover states with opacity changes',
      'Ensure 4.5:1 contrast ratio for all text',
      'Implement focus indicators for keyboard navigation',
      'Test with screen readers for accessibility compliance'
    ];
    
    // Final scores
    console.log('\\n📈 FINAL SCORES:');
    console.log(`Aesthetic Quality: ${Math.max(0, assessment.aesthetic.score)}/5`);
    console.log(`Styling Compliance: ${Math.max(0, assessment.styling.score)}/5`);
    console.log(`Usability Standards: ${Math.max(0, assessment.usability.score)}/5`);
    
    const overallScore = (
      Math.max(0, assessment.aesthetic.score) + 
      Math.max(0, assessment.styling.score) + 
      Math.max(0, assessment.usability.score)
    ) / 3;
    
    console.log(`\\n🎯 Overall UI/UX Score: ${overallScore.toFixed(1)}/5`);
    
    // Detailed feedback
    console.log('\\n🔍 DETAILED FEEDBACK:');
    
    console.log('\\nAesthetic Issues:');
    assessment.aesthetic.issues.forEach(issue => console.log(`  ❌ ${issue}`));
    
    console.log('\\nStyling Issues:');
    assessment.styling.issues.forEach(issue => console.log(`  ❌ ${issue}`));
    
    console.log('\\nUsability Issues:');
    assessment.usability.issues.forEach(issue => console.log(`  ❌ ${issue}`));
    
    console.log('\\n💡 PRIORITY RECOMMENDATIONS:');
    console.log('\\nAesthetic:');
    assessment.aesthetic.recommendations.slice(0, 2).forEach(rec => console.log(`  🎨 ${rec}`));
    
    console.log('\\nStyling:');
    assessment.styling.recommendations.slice(0, 2).forEach(rec => console.log(`  📐 ${rec}`));
    
    console.log('\\nUsability:');
    assessment.usability.recommendations.slice(0, 2).forEach(rec => console.log(`  🎯 ${rec}`));
    
    // Save detailed report
    const report = {
      timestamp,
      colorPalette,
      visualHierarchy,
      stylingCompliance,
      usabilityMetrics,
      assessment,
      overallScore: overallScore.toFixed(1)
    };
    
    fs.writeFileSync(`colors-evaluation-report-${timestamp}.json`, JSON.stringify(report, null, 2));
    console.log(`\\n💾 Detailed report saved to colors-evaluation-report-${timestamp}.json`);
    
  } catch (error) {
    console.error('❌ Error during evaluation:', error);
  } finally {
    await browser.close();
  }
}

evaluateColorsPage().catch(console.error);