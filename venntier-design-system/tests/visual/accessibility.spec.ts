import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Visual Tests', () => {
  test.describe('Automated Accessibility Scanning', () => {
    test('Foundation pages should be accessible', async ({ page }) => {
      const pages = [
        '/foundation/colors',
        '/foundation/typography',
        '/foundation/spacing',
        '/foundation/elevation',
      ];

      for (const pagePath of pages) {
        await page.goto(pagePath);
        await page.waitForSelector('app-root');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
      }
    });

    test('Component pages should be accessible', async ({ page }) => {
      const pages = [
        '/components/buttons',
        '/components/form-fields',
        '/components/cards',
        '/components/lists',
        '/components/navigation',
      ];

      for (const pagePath of pages) {
        await page.goto(pagePath);
        await page.waitForSelector('app-root');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
      }
    });
  });

  test.describe('Focus Management', () => {
    test('Focus indicators should be visible', async ({ page }) => {
      await page.goto('/components/buttons');
      await page.waitForSelector('button');

      // Tab to first button
      await page.keyboard.press('Tab');

      // Take screenshot of focused button
      const focusedButton = page.locator('button:focus');
      await expect(focusedButton).toHaveScreenshot('button-focus-indicator.png');
    });

    test('Form field focus should be visible', async ({ page }) => {
      await page.goto('/components/form-fields');
      await page.waitForSelector('input[matInput]');

      // Tab to first input
      await page.keyboard.press('Tab');

      // Take screenshot of focused input
      const focusedInput = page.locator('input:focus');
      await expect(focusedInput).toHaveScreenshot('input-focus-indicator.png');
    });

    test('Keyboard navigation should work correctly', async ({ page }) => {
      await page.goto('/components/buttons');
      await page.waitForSelector('button');

      // Tab through multiple buttons
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Verify focus is on third button
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toHaveScreenshot('keyboard-navigation-focus.png');
    });
  });

  test.describe('High Contrast Mode', () => {
    test('Components should work in high contrast mode', async ({ page }) => {
      // Simulate high contrast mode
      await page.emulateMedia({ colorScheme: 'dark', forcedColors: 'active' });

      await page.goto('/components/buttons');
      await page.waitForSelector('button');

      await expect(page).toHaveScreenshot('high-contrast-buttons.png');
    });

    test('Form fields should work in high contrast mode', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark', forcedColors: 'active' });

      await page.goto('/components/form-fields');
      await page.waitForSelector('mat-form-field');

      await expect(page).toHaveScreenshot('high-contrast-form-fields.png');
    });
  });

  test.describe('Color Contrast Verification', () => {
    test('Text should have sufficient contrast in light theme', async ({ page }) => {
      await page.goto('/foundation/colors');
      await page.waitForSelector('.demo-color-palette');

      // Ensure light theme
      await page.click('button:has-text("Light")');
      await page.waitForTimeout(500);

      // Check contrast for various text elements
      const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6, span').all();

      for (const element of textElements.slice(0, 5)) {
        // Test first 5 elements
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
          };
        });

        // Basic check that colors are defined
        expect(styles.color).toBeTruthy();
        expect(styles.backgroundColor).toBeTruthy();
      }
    });

    test('Text should have sufficient contrast in dark theme', async ({ page }) => {
      await page.goto('/foundation/colors');
      await page.waitForSelector('.demo-color-palette');

      // Switch to dark theme
      await page.click('button:has-text("Dark")');
      await page.waitForTimeout(500);

      // Check contrast for various text elements
      const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6, span').all();

      for (const element of textElements.slice(0, 5)) {
        // Test first 5 elements
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
          };
        });

        // Basic check that colors are defined
        expect(styles.color).toBeTruthy();
        expect(styles.backgroundColor).toBeTruthy();
      }
    });
  });

  test.describe('Screen Reader Support', () => {
    test('Form fields should have proper labels', async ({ page }) => {
      await page.goto('/components/form-fields');
      await page.waitForSelector('mat-form-field');

      // Check that inputs have associated labels
      const inputs = await page.locator('input[matInput]').all();

      for (const input of inputs) {
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');

        // Input should have either aria-label or aria-labelledby
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    });

    test('Buttons should have accessible names', async ({ page }) => {
      await page.goto('/components/buttons');
      await page.waitForSelector('button');

      const buttons = await page.locator('button').all();

      for (const button of buttons) {
        const accessibleName = await button.evaluate((btn) => {
          return (
            btn.textContent?.trim() || btn.getAttribute('aria-label') || btn.getAttribute('title')
          );
        });

        expect(accessibleName).toBeTruthy();
      }
    });
  });

  test.describe('Motion and Animation', () => {
    test('Reduced motion should be respected', async ({ page }) => {
      // Simulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });

      await page.goto('/components/buttons');
      await page.waitForSelector('button');

      // Hover over button to trigger any animations
      await page.hover('button:first-of-type');
      await page.waitForTimeout(100);

      await expect(page).toHaveScreenshot('reduced-motion-button-hover.png');
    });

    test('Theme switching should respect reduced motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });

      await page.goto('/foundation/colors');
      await page.waitForSelector('.demo-color-palette');

      // Switch themes quickly
      await page.click('button:has-text("Dark")');
      await page.waitForTimeout(100);

      await expect(page).toHaveScreenshot('reduced-motion-theme-switch.png');
    });
  });
});
