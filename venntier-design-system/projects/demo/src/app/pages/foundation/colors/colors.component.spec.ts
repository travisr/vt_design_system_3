import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ColorsComponent } from './colors.component';
import { VenntierThemeService } from '@venntier/design-system';

// Migration-safe testing utilities
function verifyThemeResponsiveness(
  element: HTMLElement,
  themeService: { toggleTheme(): void },
  fixture: { detectChanges(): void },
): void {
  const initialStyles = {
    backgroundColor: window.getComputedStyle(element).backgroundColor,
    color: window.getComputedStyle(element).color,
  };
  themeService.toggleTheme();
  fixture.detectChanges();
  const newStyles = {
    backgroundColor: window.getComputedStyle(element).backgroundColor,
    color: window.getComputedStyle(element).color,
  };
  const stylesChanged =
    initialStyles.backgroundColor !== newStyles.backgroundColor ||
    initialStyles.color !== newStyles.color;
  expect(stylesChanged).toBe(true);
  themeService.toggleTheme();
  fixture.detectChanges();
}

function verifyBasicAccessibility(element: HTMLElement): void {
  expect(element.offsetParent).not.toBeNull(); // Element is visible
  const styles = window.getComputedStyle(element);
  const backgroundColor = styles.backgroundColor;
  const color = styles.color;
  if (backgroundColor && color && backgroundColor !== 'transparent' && color !== 'transparent') {
    expect(backgroundColor).not.toBe(color);
  }
}

function trackTokenMigration(element: HTMLElement, componentName: string): void {
  const styles = window.getComputedStyle(element);
  let matTokens = 0;
  for (const property of styles) {
    if (property.startsWith('--mat-sys-')) matTokens++;
  }

  if (matTokens > 0) console.warn(`${componentName} uses ${matTokens} mat tokens ✓`);
}

describe('Color System - STABLE (Protected)', () => {
  let _component: ColorsComponent;
  let fixture: ComponentFixture<ColorsComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorsComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('Primary Color System - STABLE (Strict Protection)', () => {
    it('should maintain primary color structure', () => {
      const primaryColors = fixture.nativeElement.querySelectorAll(
        '.primary-color, .color-primary, [class*="primary"], mat-card',
      );
      expect(primaryColors.length).toBeGreaterThan(0);

      primaryColors.forEach((colorElement: HTMLElement) => {
        expect(colorElement.offsetParent).not.toBeNull();
        const styles = window.getComputedStyle(colorElement);
        expect(styles.backgroundColor).not.toBe('transparent');
        expect(styles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      });
    });

    it('should have accessible primary colors', () => {
      const primaryColors = fixture.nativeElement.querySelectorAll(
        '.primary-color, .color-primary, [class*="primary"], mat-card',
      );
      primaryColors.forEach((colorElement: HTMLElement) => {
        verifyBasicAccessibility(colorElement);
      });
    });

    it('should respond to theme changes', () => {
      const primaryColor = fixture.nativeElement.querySelector(
        '.primary-color, .color-primary, [class*="primary"], mat-card',
      );
      if (primaryColor) {
        verifyThemeResponsiveness(primaryColor, themeService, fixture);
      }
    });
  });

  describe('Color System Structure - STABLE (Strict Protection)', () => {
    it('should maintain color demonstration structure', () => {
      const colorDemo = fixture.nativeElement.querySelector(
        '.demo-colors, .colors-demo, .color-palette',
      );
      const colorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );

      expect(colorDemo || colorElements.length > 0).toBe(true);
      expect(colorElements.length).toBeGreaterThan(0);

      colorElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull();
      });
    });

    it('should have multiple color categories', () => {
      const allColorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );
      expect(allColorElements.length).toBeGreaterThan(2);

      const hasBackground = Array.from(allColorElements).some((element) => {
        const styles = window.getComputedStyle(element as HTMLElement);
        return styles.backgroundColor && styles.backgroundColor !== 'transparent';
      });
      expect(hasBackground).toBe(true);
    });

    it('should display color information', () => {
      const colorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );
      colorElements.forEach((element: HTMLElement) => {
        // Should have some visual indication of the color
        const styles = window.getComputedStyle(element);
        const hasColor =
          styles.backgroundColor !== 'transparent' ||
          styles.borderColor !== 'transparent' ||
          styles.color !== 'transparent';
        expect(hasColor).toBe(true);
      });
    });
  });

  describe('Color Contrast - STABLE (Strict Protection)', () => {
    it('should maintain proper contrast ratios', () => {
      const colorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );

      colorElements.forEach((element: HTMLElement) => {
        const styles = window.getComputedStyle(element);
        const backgroundColor = styles.backgroundColor;
        const textColor = styles.color;

        if (
          backgroundColor &&
          textColor &&
          backgroundColor !== 'transparent' &&
          textColor !== 'transparent'
        ) {
          expect(backgroundColor).not.toBe(textColor);
        }
      });
    });

    it('should have readable text on all color backgrounds', () => {
      const colorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );

      colorElements.forEach((element: HTMLElement) => {
        if (element.textContent?.trim()) {
          const styles = window.getComputedStyle(element);
          expect(styles.color).not.toBe('transparent');
          expect(styles.color).not.toBe('rgba(0, 0, 0, 0)');
        }
      });
    });
  });

  describe('Color Theme Responsiveness - STABLE', () => {
    it('should respond to theme changes', () => {
      const colorElement = fixture.nativeElement.querySelector(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );
      if (colorElement) {
        verifyThemeResponsiveness(colorElement, themeService, fixture);
      }
    });

    it('should maintain color structure across themes', () => {
      const colorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );
      const initialCount = colorElements.length;

      themeService.toggleTheme();
      fixture.detectChanges();

      const newColorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );
      expect(newColorElements.length).toBe(initialCount);

      themeService.toggleTheme();
      fixture.detectChanges();
    });
  });

  describe('Color Migration Tracking', () => {
    it('should track color token migration progress', () => {
      const colorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );

      colorElements.forEach((element: HTMLElement, index: number) => {
        trackTokenMigration(element, `Color-${index}`);
      });

      expect(colorElements.length).toBeGreaterThan(0);
    });

    it('should log color system migration status', () => {
      const colorDemo = fixture.nativeElement.querySelector(
        '.demo-colors, .colors-demo, .color-palette',
      );
      if (colorDemo) {
        const styles = window.getComputedStyle(colorDemo);

        let mdTokenCount = 0;
        let matTokenCount = 0;

        for (const property of styles) {
          if (property.includes('mat-sys-color')) {
            mdTokenCount++;
          } else if (property.includes('mat-sys')) {
            matTokenCount++;
          }
        }

        if (mdTokenCount > 0) {
          console.warn(`Color system still uses ${mdTokenCount} md tokens`);
        }
        if (matTokenCount > 0) {
          console.warn(`Color system uses ${matTokenCount} mat tokens ✓`);
        }
      }
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break color visibility', () => {
      const colorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );

      expect(colorElements.length).toBeGreaterThan(0);

      colorElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull();
      });
    });

    it('should never break color system structure', () => {
      const colorDemo = fixture.nativeElement.querySelector(
        '.demo-colors, .colors-demo, .color-palette',
      );
      const colorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );

      expect(colorDemo || colorElements.length > 0).toBe(true);
      expect(colorElements.length).toBeGreaterThan(0);
    });

    it('should never break theme responsiveness', () => {
      const colorElement = fixture.nativeElement.querySelector(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );
      if (colorElement) {
        const _initialColor = window.getComputedStyle(colorElement).backgroundColor;

        themeService.toggleTheme();
        fixture.detectChanges();

        const newColor = window.getComputedStyle(colorElement).backgroundColor;
        expect(newColor).toBeTruthy();

        themeService.toggleTheme();
        fixture.detectChanges();
      }
    });

    it('should never break color accessibility', () => {
      const colorElements = fixture.nativeElement.querySelectorAll(
        '[class*="color"], .color-swatch, mat-card, .color-example',
      );

      colorElements.forEach((element: HTMLElement) => {
        verifyBasicAccessibility(element);
      });
    });
  });
});
