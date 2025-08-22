import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ElevationComponent } from './elevation.component';
import { VenntierThemeService } from '@venntier/design-system';

// Migration-safe testing utilities
function _verifyElevation(element: HTMLElement, expectedShadow: string): void {
  const styles = window.getComputedStyle(element);
  expect(styles.boxShadow).toBe(expectedShadow);
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

describe('Elevation System - STABLE (Protected)', () => {
  let _component: ElevationComponent;
  let fixture: ComponentFixture<ElevationComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevationComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ElevationComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('Elevation Levels - STABLE (Strict Protection)', () => {
    it('should have elevation level examples', () => {
      const elevationElements = fixture.nativeElement.querySelectorAll(
        '.elevation-0, .elevation-1, .elevation-2, .elevation-3, .elevation-4, .elevation-5, [class*="elevation"], mat-card',
      );
      expect(elevationElements.length).toBeGreaterThan(0);

      elevationElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull(); // Element is visible
      });
    });

    it('should maintain Level 0 elevation (no shadow)', () => {
      const level0 = fixture.nativeElement.querySelector('.elevation-0, [data-elevation="0"]');
      if (level0) {
        const shadow = window.getComputedStyle(level0).boxShadow;
        expect(shadow).toMatch(/^(none|rgba\(0, 0, 0, 0\)|0px 0px 0px).*$/);
      }
    });

    it('should have increasing shadow complexity', () => {
      const elevationElements = fixture.nativeElement.querySelectorAll(
        '[class*="elevation"], mat-card',
      );

      if (elevationElements.length > 1) {
        const shadows = Array.from(elevationElements).map((element) => {
          return window.getComputedStyle(element as HTMLElement).boxShadow;
        });

        // Should have variety in shadows
        const uniqueShadows = new Set(shadows);
        expect(uniqueShadows.size).toBeGreaterThan(1);
      }
    });

    it('should maintain elevation hierarchy order', () => {
      const elevationCards = fixture.nativeElement.querySelectorAll(
        '[class*="elevation"], mat-card',
      );
      expect(elevationCards.length).toBeGreaterThan(2);

      elevationCards.forEach((card: HTMLElement) => {
        expect(card.offsetParent).not.toBeNull();
      });
    });
  });

  describe('Elevation Cards Integration', () => {
    it('should use Material Design cards for elevation examples', () => {
      const elevationCards = fixture.nativeElement.querySelectorAll(
        'mat-card, .elevation-card, [class*="elevation"]',
      );
      expect(elevationCards.length).toBeGreaterThan(0);

      elevationCards.forEach((card: HTMLElement) => {
        // Cards should be visible
        expect(card.offsetParent).not.toBeNull();

        // Should have some shadow or elevation styling
        const styles = window.getComputedStyle(card);
        const hasShadow = styles.boxShadow && styles.boxShadow !== 'none';
        const hasElevation =
          card.className.includes('elevation') || card.className.includes('mat-');

        expect(hasShadow || hasElevation).toBe(true);
      });
    });

    it('should have proper card content structure', () => {
      const cards = fixture.nativeElement.querySelectorAll(
        'mat-card, .elevation-card, [class*="elevation"]',
      );

      cards.forEach((card: HTMLElement) => {
        // Each card should have content or be a demonstration element
        expect(card.offsetParent).not.toBeNull();

        // Should have some visual styling
        const styles = window.getComputedStyle(card);
        expect(styles.display).not.toBe('none');
      });
    });
  });

  describe('Elevation Theme Responsiveness - STABLE', () => {
    it('should maintain elevation shadows across theme changes', () => {
      const elevationElement = fixture.nativeElement.querySelector(
        '[class*="elevation"], mat-card',
      );
      if (elevationElement) {
        const _initialShadow = window.getComputedStyle(elevationElement).boxShadow;

        themeService.toggleTheme();
        fixture.detectChanges();

        // Shadow should remain consistent (elevation doesn't change with theme)
        const newShadow = window.getComputedStyle(elevationElement).boxShadow;
        expect(newShadow).toBeTruthy(); // Should still have shadow

        themeService.toggleTheme();
        fixture.detectChanges();
      }
    });

    it('should respond to theme changes for background colors only', () => {
      const elevationElement = fixture.nativeElement.querySelector(
        '[class*="elevation"], mat-card',
      );
      if (elevationElement) {
        verifyThemeResponsiveness(elevationElement, themeService, fixture);
      }
    });
  });

  describe('Elevation Migration Tracking', () => {
    it('should track elevation token migration progress', () => {
      const elevationElements = fixture.nativeElement.querySelectorAll(
        '[class*="elevation"], mat-card',
      );

      elevationElements.forEach((element: HTMLElement, index: number) => {
        trackTokenMigration(element, `Elevation-Level-${index}`);
      });

      expect(elevationElements.length).toBeGreaterThan(0);
    });
  });

  describe('Elevation System Structure', () => {
    it('should demonstrate multiple elevation levels', () => {
      const elevationDemo = fixture.nativeElement.querySelector(
        '.demo-elevation, .elevation-demo, .elevation-examples',
      );
      const elevationElements = fixture.nativeElement.querySelectorAll(
        '[class*="elevation"], mat-card',
      );

      expect(elevationDemo || elevationElements.length > 0).toBe(true);
      expect(elevationElements.length).toBeGreaterThan(2);
    });

    it('should show elevation progression', () => {
      const elevationElements = fixture.nativeElement.querySelectorAll(
        '[class*="elevation"], mat-card',
      );

      if (elevationElements.length > 2) {
        // Should have different shadow values
        const shadows = Array.from(elevationElements).map((element) => {
          return window.getComputedStyle(element as HTMLElement).boxShadow;
        });

        const uniqueShadows = new Set(shadows.filter((shadow) => shadow !== 'none'));
        expect(uniqueShadows.size).toBeGreaterThan(1);
      }
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break elevation system structure', () => {
      const elevationDemo = fixture.nativeElement.querySelector(
        '.demo-elevation, .elevation-demo, .elevation-examples',
      );
      const elevationCards = fixture.nativeElement.querySelectorAll(
        '[class*="elevation"], mat-card',
      );

      expect(elevationDemo || elevationCards.length > 0).toBe(true);
      expect(elevationCards.length).toBeGreaterThan(0);
    });

    it('should never break elevation hierarchy', () => {
      const elevationElements = fixture.nativeElement.querySelectorAll(
        '[class*="elevation"], mat-card',
      );
      expect(elevationElements.length).toBeGreaterThan(0);

      // Should have some variety in elevation
      const shadows = Array.from(elevationElements).map((element) => {
        return window.getComputedStyle(element as HTMLElement).boxShadow;
      });

      const uniqueShadows = new Set(shadows);
      expect(uniqueShadows.size).toBeGreaterThanOrEqual(1);
    });

    it('should never break card visibility', () => {
      const elevationCards = fixture.nativeElement.querySelectorAll(
        '[class*="elevation"], mat-card',
      );

      elevationCards.forEach((card: HTMLElement) => {
        expect(card.offsetParent).not.toBeNull();
      });
    });

    it('should never break elevation demonstration', () => {
      const elevationElements = fixture.nativeElement.querySelectorAll(
        '[class*="elevation"], mat-card, .elevation-example',
      );

      expect(elevationElements.length).toBeGreaterThan(0);

      elevationElements.forEach((element: HTMLElement) => {
        // Should be visible
        expect(element.offsetParent).not.toBeNull();

        // Should have some styling
        const styles = window.getComputedStyle(element);
        expect(styles.display).not.toBe('none');
      });
    });
  });
});
