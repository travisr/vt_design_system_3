import { test, expect } from '@playwright/test';

function getRgbChannels(rgb: string): [number, number, number] {
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

// Quick check on the home page
// - sidenav background should be the nav surface token (#f7f7f8 in light)
// - hover vs selected shading relationship
// - selected text visibility and darker than unselected

test('Sidenav quick check on home page', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('mat-sidenav.vt-sidenav-standard');

  const bg = await page.$eval(
    'mat-sidenav.vt-sidenav-standard',
    (el) => getComputedStyle(el as HTMLElement).backgroundColor,
  );
  expect(bg).toMatch(/rgb\(\s*247\s*,\s*247\s*,\s*248\s*\)/); // #f7f7f8

  const items = page.locator('.vt-sidenav-standard mat-nav-list a[mat-list-item]');
  const itemCount = await items.count();
  expect(itemCount).toBeGreaterThan(1);

  const first = items.first();
  const second = items.nth(1);

  // Unselected text color baseline
  const unselectedColor = await second.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  const unselectedLum = luminance(getRgbChannels(unselectedColor));

  // Hover second
  await second.hover();
  await page.waitForTimeout(50);
  const hoverBg = await second.evaluate(
    (el) => getComputedStyle(el as HTMLElement).backgroundColor,
  );

  // Select second
  await second.click();
  await page.waitForTimeout(50);
  const selectedBg = await second.evaluate(
    (el) => getComputedStyle(el as HTMLElement).backgroundColor,
  );
  const selectedText = await second.evaluate((el) => getComputedStyle(el as HTMLElement).color);

  const hoverLum = luminance(getRgbChannels(hoverBg));
  const selectedLum = luminance(getRgbChannels(selectedBg));
  const selectedTextLum = luminance(getRgbChannels(selectedText));

  expect(selectedLum).toBeLessThan(hoverLum);
  expect(selectedTextLum).toBeLessThan(unselectedLum);
  expect(Math.abs(selectedTextLum - selectedLum)).toBeGreaterThan(0.15);
});
