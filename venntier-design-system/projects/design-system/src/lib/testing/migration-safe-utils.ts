/**
 * Migration-Safe Testing Utilities
 *
 * These utilities test behavior and structure while being flexible about
 * md→mat token migration. They protect your stable design system elements
 * without breaking during the token migration process.
 */

/**
 * Test that design tokens exist without checking specific values
 */
export function verifyTokensExist(element: HTMLElement, tokenNames: string[]): void {
  const styles = window.getComputedStyle(element);

  tokenNames.forEach((tokenName) => {
    const value = styles.getPropertyValue(tokenName);
    // Just verify the token exists and has some value
    expect(value).toBeTruthy();
    expect(value.trim()).not.toBe('');
    expect(value).not.toBe('initial');
    expect(value).not.toBe('inherit');
  });
}

/**
 * Test that component structure is correct regardless of styling
 */
export function verifyComponentStructure(
  expectedElements: { role: string; name?: string }[],
): void {
  expectedElements.forEach(({ role, name }) => {
    if (name) {
      expect(document.querySelector(`[role="${role}"]`)).toBeTruthy();
    } else {
      expect(document.querySelector(`[role="${role}"]`)).toBeTruthy();
    }
  });
}

/**
 * Test that Angular Material classes are present (these shouldn't change)
 */
export function verifyMaterialClasses(element: HTMLElement, expectedClasses: string[]): void {
  expectedClasses.forEach((className) => {
    expect(element.classList.contains(className)).toBe(true);
  });
}

/**
 * Test basic accessibility without relying on specific colors
 */
export function verifyBasicAccessibility(element: HTMLElement): void {
  // Test that element is visible
  expect(element.offsetParent).not.toBeNull(); // Element is visible

  // Test that interactive elements are focusable
  if (element.tagName === 'BUTTON' || element.tagName === 'INPUT') {
    expect(element.tabIndex).toBeGreaterThanOrEqual(0);
  }

  // Test that colors are not the same (basic contrast check)
  const styles = window.getComputedStyle(element);
  const backgroundColor = styles.backgroundColor;
  const color = styles.color;

  if (backgroundColor && color && backgroundColor !== 'transparent' && color !== 'transparent') {
    expect(backgroundColor).not.toBe(color);
  }
}

/**
 * Test exact dimensions for stable layout elements
 */
export function verifyStableDimensions(
  element: HTMLElement,
  expectedDimensions: {
    width?: string;
    height?: string;
    padding?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
  },
): void {
  const styles = window.getComputedStyle(element);

  Object.entries(expectedDimensions).forEach(([property, expectedValue]) => {
    const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
    const actualValue = styles.getPropertyValue(cssProperty);
    expect(actualValue).toBe(expectedValue);
  });
}

/**
 * Test typography scale with exact values
 */
export function verifyTypographyScale(
  element: HTMLElement,
  expectedTypography: {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing?: string;
  },
): void {
  const styles = window.getComputedStyle(element);

  expect(styles.fontSize).toBe(expectedTypography.fontSize);
  expect(styles.fontWeight).toBe(expectedTypography.fontWeight);
  expect(styles.lineHeight).toBe(expectedTypography.lineHeight);

  if (expectedTypography.letterSpacing) {
    expect(styles.letterSpacing).toBe(expectedTypography.letterSpacing);
  }
}

/**
 * Test elevation with exact shadow values
 */
export function verifyElevation(element: HTMLElement, expectedShadow: string): void {
  const styles = window.getComputedStyle(element);
  expect(styles.boxShadow).toBe(expectedShadow);
}

/**
 * Test spacing scale with exact values
 */
export function verifySpacing(element: HTMLElement, expectedSpacing: string): void {
  const styles = window.getComputedStyle(element);
  expect(styles.padding).toBe(expectedSpacing);
}

/**
 * Test that theme switching changes something without checking specific values
 */
export function verifyThemeResponsiveness(
  element: HTMLElement,
  themeService: { toggleTheme(): void },
  fixture: { detectChanges(): void },
): void {
  // Get initial styles
  const initialStyles = {
    backgroundColor: window.getComputedStyle(element).backgroundColor,
    color: window.getComputedStyle(element).color,
  };

  // Switch theme
  themeService.toggleTheme();
  fixture.detectChanges();

  // Get new styles
  const newStyles = {
    backgroundColor: window.getComputedStyle(element).backgroundColor,
    color: window.getComputedStyle(element).color,
  };

  // Verify that SOMETHING changed (don't care about specific values)
  const stylesChanged =
    initialStyles.backgroundColor !== newStyles.backgroundColor ||
    initialStyles.color !== newStyles.color;

  expect(stylesChanged).toBe(true);

  // Switch back
  themeService.toggleTheme();
  fixture.detectChanges();
}

/**
 * Track migration progress without failing tests
 */
export function trackTokenMigration(element: HTMLElement, componentName: string): void {
  const styles = window.getComputedStyle(element);
  const mdTokens: string[] = [];
  const matTokens: string[] = [];

  // Check for Angular Material 20 tokens in the element's computed styles
  for (const property of styles) {
    if (property.startsWith('--mat-sys-')) {
      matTokens.push(property);
    }
  }

  // Log progress (don't fail tests)
  if (mdTokens.length > 0) {
    console.warn(`${componentName} still uses ${mdTokens.length} md tokens:`, mdTokens.slice(0, 3));
  }

  if (matTokens.length > 0) {
    console.warn(`${componentName} uses ${matTokens.length} mat tokens ✓`);
  }
}
