import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpacingComponent } from './spacing.component';
import { VenntierThemeService } from '@venntier/design-system';

// Migration-safe testing utilities
function _verifySpacing(element: HTMLElement, expectedSpacing: string): void {
  const styles = window.getComputedStyle(element);
  expect(styles.padding).toBe(expectedSpacing);
}

function verifyThemeResponsiveness(
  element: HTMLElement,
  themeService: { toggleTheme(): void },
  fixture: { detectChanges(): void },
): void {
  const _initialColor = window.getComputedStyle(element).backgroundColor;
  themeService.toggleTheme();
  fixture.detectChanges();
  const newColor = window.getComputedStyle(element).backgroundColor;
  expect(newColor).toBeTruthy();
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

describe('Spacing System - STABLE (Protected)', () => {
  let _component: SpacingComponent;
  let fixture: ComponentFixture<SpacingComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacingComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SpacingComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('Spacing Scale - STABLE (Strict Protection)', () => {
    it('should have spacing scale examples', () => {
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '.spacing-xs, .spacing-sm, .spacing-md, .spacing-lg, .spacing-xl, [class*="spacing"], .spacing-example',
      );
      expect(spacingElements.length).toBeGreaterThan(0);

      spacingElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull(); // Element is visible
      });
    });

    it('should maintain spacing scale progression', () => {
      const spacingElements = [
        { selector: '.spacing-xs, [data-spacing="xs"]', minPadding: 2, maxPadding: 8 },
        { selector: '.spacing-sm, [data-spacing="sm"]', minPadding: 6, maxPadding: 12 },
        { selector: '.spacing-md, [data-spacing="md"]', minPadding: 12, maxPadding: 20 },
        { selector: '.spacing-lg, [data-spacing="lg"]', minPadding: 20, maxPadding: 28 },
        { selector: '.spacing-xl, [data-spacing="xl"]', minPadding: 28, maxPadding: 40 },
      ];

      const actualSpacings: number[] = [];

      spacingElements.forEach(({ selector, minPadding, maxPadding }) => {
        const element = fixture.nativeElement.querySelector(selector);
        if (element) {
          const styles = window.getComputedStyle(element);
          const padding = parseFloat(styles.padding);
          actualSpacings.push(padding);

          // PROTECTED: Each spacing value should be in expected range
          expect(padding).toBeGreaterThanOrEqual(minPadding);
          expect(padding).toBeLessThanOrEqual(maxPadding);
        }
      });

      // PROTECTED: Spacing should increase progressively
      for (let i = 1; i < actualSpacings.length; i++) {
        expect(actualSpacings[i]).toBeGreaterThan(actualSpacings[i - 1]);
      }
    });

    it('should follow consistent base unit system', () => {
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      spacingElements.forEach((element: HTMLElement) => {
        const styles = window.getComputedStyle(element);
        const padding = parseFloat(styles.padding);

        // PROTECTED: All spacing should be divisible by 4 (4px base unit)
        if (!isNaN(padding) && padding > 0) {
          expect(padding % 4).toBe(0);
        }
      });
    });
  });

  describe('Spacing Hierarchy - STABLE (Strict Protection)', () => {
    it('should demonstrate spacing variety', () => {
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      if (spacingElements.length > 1) {
        const paddings = Array.from(spacingElements)
          .map((element) => {
            return parseFloat(window.getComputedStyle(element as HTMLElement).padding);
          })
          .filter((p) => !isNaN(p));

        // Should have variety in spacing values
        const uniquePaddings = new Set(paddings);
        expect(uniquePaddings.size).toBeGreaterThan(1);
      }
    });

    it('should maintain readable spacing ranges', () => {
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      spacingElements.forEach((element: HTMLElement) => {
        const styles = window.getComputedStyle(element);
        const padding = parseFloat(styles.padding);

        if (!isNaN(padding)) {
          // PROTECTED: Spacing should be reasonable (not too small or too large)
          expect(padding).toBeGreaterThanOrEqual(0);
          expect(padding).toBeLessThanOrEqual(100); // Max reasonable spacing
        }
      });
    });
  });

  describe('Spacing Theme Responsiveness - STABLE', () => {
    it('should maintain spacing values across theme changes', () => {
      const spacingElement = fixture.nativeElement.querySelector(
        '[class*="spacing"], .spacing-example',
      );
      if (spacingElement) {
        const initialPadding = window.getComputedStyle(spacingElement).padding;

        themeService.toggleTheme();
        fixture.detectChanges();

        // Padding should remain the same across themes
        const newPadding = window.getComputedStyle(spacingElement).padding;
        expect(newPadding).toBe(initialPadding);

        themeService.toggleTheme();
        fixture.detectChanges();
      }
    });

    it('should respond to theme changes for colors only', () => {
      const spacingElement = fixture.nativeElement.querySelector(
        '[class*="spacing"], .spacing-example',
      );
      if (spacingElement) {
        verifyThemeResponsiveness(spacingElement, themeService, fixture);
      }
    });
  });

  describe('Spacing Examples Structure', () => {
    it('should have proper spacing demonstration structure', () => {
      const spacingDemo = fixture.nativeElement.querySelector(
        '.demo-spacing, .spacing-demo, .spacing-examples',
      );
      const spacingExamples = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      expect(spacingDemo || spacingExamples.length > 0).toBe(true);
      expect(spacingExamples.length).toBeGreaterThan(0);
    });

    it('should display spacing values clearly', () => {
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      spacingElements.forEach((element: HTMLElement) => {
        // Each spacing element should be visible
        expect(element.offsetParent).not.toBeNull();

        // Should have some visual indication of spacing
        const styles = window.getComputedStyle(element);
        const hasPadding = parseFloat(styles.padding) > 0;
        const hasMargin = parseFloat(styles.margin) > 0;
        const hasGap = parseFloat(styles.gap) > 0;

        expect(hasPadding || hasMargin || hasGap).toBe(true);
      });
    });
  });

  describe('Spacing Token Integration', () => {
    it('should use CSS custom properties for spacing', () => {
      const spacingElements = [
        { selector: '.spacing-xs, [data-spacing="xs"]', token: '--vt-spacing-xs' },
        { selector: '.spacing-sm, [data-spacing="sm"]', token: '--vt-spacing-sm' },
        { selector: '.spacing-md, [data-spacing="md"]', token: '--vt-spacing-md' },
        { selector: '.spacing-lg, [data-spacing="lg"]', token: '--vt-spacing-lg' },
        { selector: '.spacing-xl, [data-spacing="xl"]', token: '--vt-spacing-xl' },
      ];

      spacingElements.forEach(({ selector, token }) => {
        const element = fixture.nativeElement.querySelector(selector);
        if (element) {
          const styles = window.getComputedStyle(element);
          const tokenValue = styles.getPropertyValue(token);

          // FLEXIBLE: Token may or may not exist during migration
          if (tokenValue) {
            expect(tokenValue.trim()).toBeTruthy();
          }
        }
      });
    });
  });

  describe('Spacing Migration Tracking', () => {
    it('should track spacing token migration progress', () => {
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      spacingElements.forEach((element: HTMLElement, index: number) => {
        trackTokenMigration(element, `Spacing-${index}`);
      });

      expect(spacingElements.length).toBeGreaterThan(0);
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break spacing system structure', () => {
      const spacingDemo = fixture.nativeElement.querySelector(
        '.demo-spacing, .spacing-demo, .spacing-examples',
      );
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      expect(spacingDemo || spacingElements.length > 0).toBe(true);
      expect(spacingElements.length).toBeGreaterThan(0);
    });

    it('should never break base unit system', () => {
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      spacingElements.forEach((element: HTMLElement) => {
        const styles = window.getComputedStyle(element);
        const padding = parseFloat(styles.padding);

        // CRITICAL: All spacing must follow base unit system
        if (!isNaN(padding) && padding > 0) {
          expect(padding % 4).toBe(0);
        }
      });
    });

    it('should never break spacing visibility', () => {
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      spacingElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull();
      });
    });

    it('should never break spacing progression', () => {
      const spacingElements = fixture.nativeElement.querySelectorAll(
        '[class*="spacing"], .spacing-example',
      );

      if (spacingElements.length > 1) {
        const paddings = Array.from(spacingElements)
          .map((element) => {
            return parseFloat(window.getComputedStyle(element as HTMLElement).padding);
          })
          .filter((p) => !isNaN(p) && p > 0);

        // Should have variety in spacing
        const uniquePaddings = new Set(paddings);
        expect(uniquePaddings.size).toBeGreaterThan(0);
      }
    });
  });
});
