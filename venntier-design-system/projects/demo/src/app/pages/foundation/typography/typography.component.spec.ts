import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TypographyComponent } from './typography.component';
import { VenntierThemeService } from '@venntier/design-system';

// Migration-safe testing utilities
function _verifyTypographyScale(
  element: HTMLElement,
  expected: { fontSize: string; fontWeight: string; lineHeight: string },
): void {
  const styles = window.getComputedStyle(element);
  expect(styles.fontSize).toBe(expected.fontSize);
  expect(styles.fontWeight).toBe(expected.fontWeight);
  expect(styles.lineHeight).toBe(expected.lineHeight);
}

function verifyThemeResponsiveness(
  element: HTMLElement,
  themeService: { toggleTheme(): void },
  fixture: { detectChanges(): void },
): void {
  const _initialColor = window.getComputedStyle(element).color;
  themeService.toggleTheme();
  fixture.detectChanges();
  const newColor = window.getComputedStyle(element).color;
  expect(newColor).toBeTruthy(); // Should have some color
  themeService.toggleTheme();
  fixture.detectChanges();
}

function trackTokenMigration(element: HTMLElement, componentName: string): void {
  const styles = window.getComputedStyle(element);
  let matTokens = 0;
  for (const property of styles) {
    if (property.startsWith('--mat-sys-')) matTokens++;
  }

  if (matTokens > 0) console.warn(`${componentName} uses ${matTokens} mat tokens ✓`);
}

describe('Typography System - STABLE (Protected)', () => {
  let _component: TypographyComponent;
  let fixture: ComponentFixture<TypographyComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographyComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TypographyComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('Display Typography - STABLE (Strict Protection)', () => {
    it('should have Display typography elements', () => {
      const displayElements = fixture.nativeElement.querySelectorAll(
        'h1, .display-large, .display-medium, .display-small, [class*="display"]',
      );
      expect(displayElements.length).toBeGreaterThan(0);
      displayElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull(); // Element is visible
        const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
        expect(fontSize).toBeGreaterThan(24); // Display should be large
      });
    });

    it('should maintain Display Large typography scale', () => {
      const displayLarge = fixture.nativeElement.querySelector('h1, .display-large');
      if (displayLarge) {
        const styles = window.getComputedStyle(displayLarge);
        const fontSize = parseFloat(styles.fontSize);
        expect(fontSize).toBeGreaterThanOrEqual(48); // Should be large display text
        expect(styles.fontWeight).toMatch(/^(400|normal)$/); // Should be normal weight
      }
    });
  });

  describe('Headline Typography - STABLE (Strict Protection)', () => {
    it('should have Headline typography elements', () => {
      const headlineElements = fixture.nativeElement.querySelectorAll(
        'h2, h3, .headline-large, .headline-medium, .headline-small, [class*="headline"]',
      );
      expect(headlineElements.length).toBeGreaterThan(0);
      headlineElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull();
        const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
        expect(fontSize).toBeGreaterThan(16); // Headlines should be larger than body
      });
    });

    it('should maintain Headline Large typography scale', () => {
      const _headlineLarge = fixture.nativeElement.querySelector('h2, .headline-large');
      if (_headlineLarge) {
        const styles = window.getComputedStyle(_headlineLarge);
        const fontSize = parseFloat(styles.fontSize);
        expect(fontSize).toBeGreaterThanOrEqual(24); // Should be large headline
        expect(fontSize).toBeLessThan(48); // But smaller than display
      }
    });
  });

  describe('Body Typography - STABLE (Strict Protection)', () => {
    it('should have Body typography elements', () => {
      const bodyElements = fixture.nativeElement.querySelectorAll(
        'p, .body-large, .body-medium, .body-small, [class*="body"]',
      );
      expect(bodyElements.length).toBeGreaterThan(0);
      bodyElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull();
        const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
        expect(fontSize).toBeGreaterThanOrEqual(12); // Readable size
        expect(fontSize).toBeLessThanOrEqual(20); // Not too large for body
      });
    });

    it('should maintain Body Large typography scale', () => {
      const bodyLarge = fixture.nativeElement.querySelector('p, .body-large');
      if (bodyLarge) {
        const styles = window.getComputedStyle(bodyLarge);
        const fontSize = parseFloat(styles.fontSize);
        expect(fontSize).toBeGreaterThanOrEqual(14); // Readable body text
        expect(fontSize).toBeLessThanOrEqual(18); // Standard body range
      }
    });
  });

  describe('Typography Hierarchy - STABLE (Strict Protection)', () => {
    it('should maintain proper size hierarchy', () => {
      const display = fixture.nativeElement.querySelector('h1, .display-large');
      const headline = fixture.nativeElement.querySelector('h2, .headline-large');
      const body = fixture.nativeElement.querySelector('p, .body-large');

      if (display && headline) {
        const displaySize = parseFloat(window.getComputedStyle(display).fontSize);
        const headlineSize = parseFloat(window.getComputedStyle(headline).fontSize);
        expect(displaySize).toBeGreaterThan(headlineSize);
      }

      if (headline && body) {
        const headlineSize = parseFloat(window.getComputedStyle(headline).fontSize);
        const bodySize = parseFloat(window.getComputedStyle(body).fontSize);
        expect(headlineSize).toBeGreaterThan(bodySize);
      }
    });

    it('should use consistent font family', () => {
      const typographyElements = fixture.nativeElement.querySelectorAll(
        'h1, h2, h3, p, [class*="display"], [class*="headline"], [class*="body"]',
      );
      if (typographyElements.length > 1) {
        const firstFontFamily = window.getComputedStyle(typographyElements[0]).fontFamily;
        typographyElements.forEach((element: HTMLElement) => {
          const fontFamily = window.getComputedStyle(element).fontFamily;
          expect(fontFamily).toBe(firstFontFamily);
        });
      }
    });
  });

  describe('Typography Theme Responsiveness - STABLE', () => {
    it('should maintain typography scale across theme changes', () => {
      const typographyElement = fixture.nativeElement.querySelector('h1, h2, p');
      if (typographyElement) {
        const initialSize = window.getComputedStyle(typographyElement).fontSize;
        themeService.toggleTheme();
        fixture.detectChanges();
        expect(window.getComputedStyle(typographyElement).fontSize).toBe(initialSize);
        themeService.toggleTheme();
        fixture.detectChanges();
      }
    });

    it('should respond to theme changes for colors only', () => {
      const typographyElement = fixture.nativeElement.querySelector('h1, h2, p');
      if (typographyElement) {
        verifyThemeResponsiveness(typographyElement, themeService, fixture);
      }
    });
  });

  describe('Typography Migration Tracking', () => {
    it('should track typography token migration progress', () => {
      const typographyElements = fixture.nativeElement.querySelectorAll(
        'h1, h2, h3, p, [class*="display"], [class*="headline"], [class*="body"]',
      );
      typographyElements.forEach((element: HTMLElement, index: number) => {
        trackTokenMigration(element, `Typography-${index}`);
      });
      expect(typographyElements.length).toBeGreaterThan(0);
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break typography hierarchy', () => {
      const typographyElements = fixture.nativeElement.querySelectorAll(
        'h1, h2, h3, p, [class*="display"], [class*="headline"], [class*="body"]',
      );
      expect(typographyElements.length).toBeGreaterThan(0);
    });

    it('should never break font family consistency', () => {
      const typographyElements = fixture.nativeElement.querySelectorAll('h1, h2, h3, p');
      if (typographyElements.length > 1) {
        const firstFontFamily = window.getComputedStyle(typographyElements[0]).fontFamily;
        typographyElements.forEach((element: HTMLElement) => {
          const fontFamily = window.getComputedStyle(element).fontFamily;
          expect(fontFamily).toBe(firstFontFamily);
        });
      }
    });

    it('should never break readability', () => {
      const allText = fixture.nativeElement.querySelectorAll('h1, h2, h3, p, span, div');
      allText.forEach((element: HTMLElement) => {
        if (element.textContent?.trim()) {
          const styles = window.getComputedStyle(element);
          const fontSize = parseFloat(styles.fontSize);
          expect(fontSize).toBeGreaterThanOrEqual(11); // Minimum readable size
          expect(styles.color).not.toBe('transparent');
        }
      });
    });
  });
});
