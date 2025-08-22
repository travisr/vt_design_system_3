import { test, expect } from '@playwright/test';

function parseRgb(rgb: string): [number, number, number] {
  const m = rgb.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) throw new Error(`Unexpected color: ${rgb}`);
  return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
}

function luminance([r, g, b]: [number, number, number]): number {
  const srgb = [r, g, b]
    .map((v) => v / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * Sidenav visual assertions against design requirements:
 * - Styling is set in the design system (we check applied token colors)
 * - Menu background color matches nav token
 * - Selected menu item text is visible and darker than unselected
 * - Selected shading is darker than hover shading (light theme)
 */

test.describe('Sidenav visual checks', () => {
  test('light theme sidenav: background, hover vs selected, text visibility', async ({ page }) => {
    await page.goto('/components/navigation');
    await page.waitForSelector('mat-sidenav');

    // Evaluate sidenav background color
    const sidenavBg = await page.$eval(
      'mat-sidenav',
      (el) => getComputedStyle(el as HTMLElement).backgroundColor,
    );

    // Expect nav background to match var(--mat-sys-surface-container-nav) which is #f7f7f8 in light
    expect(sidenavBg).toMatch(/rgb\(\s*247\s*,\s*247\s*,\s*248\s*\)/);

    // Get first two nav items (ensure at least two exist)
    const items = page.locator('.vt-sidenav-standard mat-nav-list a[mat-list-item]');
    const itemCount = await items.count();
    expect(itemCount).toBeGreaterThan(1);

    const first = items.first();
    const second = items.nth(1);

    // Capture unselected text color on second
    const unselectedColor = await second.evaluate(
      (el) => getComputedStyle(el as HTMLElement).color,
    );
    const unselectedLum = luminance(parseRgb(unselectedColor));

    // Hover second to get hover background
    await second.hover();
    await page.waitForTimeout(100);
    const hoverBg = await second.evaluate(
      (el) => getComputedStyle(el as HTMLElement).backgroundColor,
    );

    // Click second to activate selected state
    await second.click();
    await page.waitForTimeout(100);
    const selectedBg = await second.evaluate(
      (el) => getComputedStyle(el as HTMLElement).backgroundColor,
    );
    const selectedText = await second.evaluate((el) => getComputedStyle(el as HTMLElement).color);

    const hoverLum = luminance(parseRgb(hoverBg));
    const selectedLum = luminance(parseRgb(selectedBg));
    const selectedTextLum = luminance(parseRgb(selectedText));

    // Selected shading should be darker than hover shading (lower luminance in light theme)
    expect(selectedLum).toBeLessThan(hoverLum);

    // Selected text should be darker than unselected text (use on-surface vs on-surface-variant)
    expect(selectedTextLum).toBeLessThan(unselectedLum);

    // Selected text should be clearly visible (not near background)
    // Basic contrast check: luminance difference threshold
    expect(Math.abs(selectedTextLum - selectedLum)).toBeGreaterThan(0.15);
  });
});
