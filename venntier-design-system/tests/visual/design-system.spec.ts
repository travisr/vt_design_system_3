import { test, expect } from '@playwright/test';

test.describe('Design System Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });
  });

  test.describe('Foundation Pages', () => {
    test('Colors page - light theme', async ({ page }) => {
      await page.goto('/foundation/colors');
      await page.waitForSelector('.demo-color-palette');

      // Ensure light theme is active
      await page.click('button:has-text("Light")');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('colors-light.png');
    });

    test('Colors page - dark theme', async ({ page }) => {
      await page.goto('/foundation/colors');
      await page.waitForSelector('.demo-color-palette');

      // Switch to dark theme
      await page.click('button:has-text("Dark")');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('colors-dark.png');
    });

    test('Typography page', async ({ page }) => {
      await page.goto('/foundation/typography');
      await page.waitForSelector('.demo-typography');

      await expect(page).toHaveScreenshot('typography.png');
    });

    test('Spacing page', async ({ page }) => {
      await page.goto('/foundation/spacing');
      await page.waitForSelector('.demo-spacing');

      await expect(page).toHaveScreenshot('spacing.png');
    });

    test('Elevation page', async ({ page }) => {
      await page.goto('/foundation/elevation');
      await page.waitForSelector('.demo-elevation');

      await expect(page).toHaveScreenshot('elevation.png');
    });
  });

  test.describe('Component Pages', () => {
    test('Buttons page - all variants', async ({ page }) => {
      await page.goto('/components/buttons');
      await page.waitForSelector('mat-card');

      await expect(page).toHaveScreenshot('buttons-all-variants.png');
    });

    test('Buttons page - hover states', async ({ page }) => {
      await page.goto('/components/buttons');
      await page.waitForSelector('mat-card');

      // Hover over primary button
      await page.hover('button[mat-raised-button]:first-of-type');
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot('buttons-hover-state.png');
    });

    test('Form Fields page', async ({ page }) => {
      await page.goto('/components/form-fields');
      await page.waitForSelector('mat-form-field');

      await expect(page).toHaveScreenshot('form-fields.png');
    });

    test('Form Fields page - focused state', async ({ page }) => {
      await page.goto('/components/form-fields');
      await page.waitForSelector('mat-form-field');

      // Focus on first input
      await page.click('input[matInput]:first-of-type');
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot('form-fields-focused.png');
    });

    test('Form Fields page - error state', async ({ page }) => {
      await page.goto('/components/form-fields');
      await page.waitForSelector('mat-form-field');

      // Trigger validation error
      const input = page.locator('input[matInput]:first-of-type');
      await input.click();
      await input.fill('invalid-email');
      await page.click('body'); // Click outside to trigger validation
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot('form-fields-error.png');
    });

    test('Cards page', async ({ page }) => {
      await page.goto('/components/cards');
      await page.waitForSelector('mat-card');

      await expect(page).toHaveScreenshot('cards.png');
    });

    test('Lists page', async ({ page }) => {
      await page.goto('/components/lists');
      await page.waitForSelector('mat-list');

      await expect(page).toHaveScreenshot('lists.png');
    });

    test('Navigation page', async ({ page }) => {
      await page.goto('/components/navigation');
      await page.waitForSelector('mat-toolbar');

      await expect(page).toHaveScreenshot('navigation.png');
    });
  });

  test.describe('Density Variations', () => {
    test('Buttons - comfortable density', async ({ page }) => {
      await page.goto('/components/buttons');
      await page.waitForSelector('mat-card');

      // Select comfortable density
      await page.selectOption('select[aria-label="Density"]', 'comfortable');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot('buttons-comfortable-density.png');
    });

    test('Buttons - compact density', async ({ page }) => {
      await page.goto('/components/buttons');
      await page.waitForSelector('mat-card');

      // Select compact density
      await page.selectOption('select[aria-label="Density"]', 'compact');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot('buttons-compact-density.png');
    });

    test('Form Fields - compact density', async ({ page }) => {
      await page.goto('/components/form-fields');
      await page.waitForSelector('mat-form-field');

      // Select compact density
      await page.selectOption('select[aria-label="Density"]', 'compact');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot('form-fields-compact-density.png');
    });
  });

  test.describe('Responsive Design', () => {
    test('Mobile view - navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForSelector('app-root');

      await expect(page).toHaveScreenshot('mobile-navigation.png');
    });

    test('Tablet view - buttons page', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/components/buttons');
      await page.waitForSelector('mat-card');

      await expect(page).toHaveScreenshot('tablet-buttons.png');
    });
  });

  test.describe('Theme Switching', () => {
    test('Theme toggle functionality', async ({ page }) => {
      await page.goto('/foundation/colors');
      await page.waitForSelector('.demo-color-palette');

      // Start with light theme
      await page.click('button:has-text("Light")');
      await page.waitForTimeout(500);

      // Take light theme screenshot
      await expect(page.locator('.demo-color-palette')).toHaveScreenshot('theme-light-colors.png');

      // Switch to dark theme
      await page.click('button:has-text("Dark")');
      await page.waitForTimeout(500);

      // Take dark theme screenshot
      await expect(page.locator('.demo-color-palette')).toHaveScreenshot('theme-dark-colors.png');
    });
  });

  test.describe('Component Interactions', () => {
    test('Select dropdown open state', async ({ page }) => {
      await page.goto('/components/form-fields');
      await page.waitForSelector('mat-select');

      // Open select dropdown
      await page.click('mat-select');
      await page.waitForSelector('mat-option');

      await expect(page).toHaveScreenshot('select-dropdown-open.png');
    });

    test('Button group selection', async ({ page }) => {
      await page.goto('/components/buttons');
      await page.waitForSelector('.demo-button-group');

      // Click on a button in the group
      await page.click('.demo-button-group button:nth-child(2)');
      await page.waitForTimeout(200);

      await expect(page.locator('.demo-button-group')).toHaveScreenshot(
        'button-group-selected.png',
      );
    });
  });
});
