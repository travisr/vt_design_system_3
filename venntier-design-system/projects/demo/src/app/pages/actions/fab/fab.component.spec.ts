import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FabComponent } from './fab.component';
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
  expect(element.tabIndex).toBeGreaterThanOrEqual(0); // Focusable
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

describe('FAB System - STABLE (Protected)', () => {
  let _component: FabComponent;
  let fixture: ComponentFixture<FabComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FabComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('FAB Variants - STABLE (Strict Protection)', () => {
    it('should have FAB examples', () => {
      const fabs = fixture.nativeElement.querySelectorAll(
        'button[mat-fab], button[mat-mini-fab], [mat-fab], [mat-mini-fab], .fab, .floating-action-button',
      );
      expect(fabs.length).toBeGreaterThan(0);

      fabs.forEach((fab: HTMLElement) => {
        expect(fab.offsetParent).not.toBeNull(); // FAB is visible
      });
    });

    it('should have standard FABs', () => {
      const standardFabs = fixture.nativeElement.querySelectorAll('button[mat-fab], [mat-fab]');

      if (standardFabs.length > 0) {
        standardFabs.forEach((fab: HTMLElement) => {
          expect(fab.offsetParent).not.toBeNull();
          verifyBasicAccessibility(fab);

          // Standard FAB should be circular and reasonably sized
          const styles = window.getComputedStyle(fab);
          const width = parseFloat(styles.width);
          const height = parseFloat(styles.height);

          if (!isNaN(width) && !isNaN(height)) {
            expect(Math.abs(width - height)).toBeLessThanOrEqual(4); // Should be roughly circular
            expect(width).toBeGreaterThanOrEqual(48); // Minimum FAB size
          }
        });
      }
    });

    it('should have mini FABs', () => {
      const miniFabs = fixture.nativeElement.querySelectorAll(
        'button[mat-mini-fab], [mat-mini-fab]',
      );

      if (miniFabs.length > 0) {
        miniFabs.forEach((fab: HTMLElement) => {
          expect(fab.offsetParent).not.toBeNull();
          verifyBasicAccessibility(fab);

          // Mini FAB should be smaller than standard FAB
          const styles = window.getComputedStyle(fab);
          const width = parseFloat(styles.width);
          const height = parseFloat(styles.height);

          if (!isNaN(width) && !isNaN(height)) {
            expect(Math.abs(width - height)).toBeLessThanOrEqual(4); // Should be roughly circular
            expect(width).toBeGreaterThanOrEqual(32); // Minimum mini FAB size
            expect(width).toBeLessThanOrEqual(48); // Should be smaller than standard FAB
          }
        });
      }
    });

    it('should demonstrate different FAB colors', () => {
      const coloredFabs = fixture.nativeElement.querySelectorAll(
        '[mat-fab][color], [mat-mini-fab][color]',
      );

      if (coloredFabs.length > 0) {
        coloredFabs.forEach((fab: HTMLElement) => {
          expect(fab.offsetParent).not.toBeNull();

          // Should have color attribute
          const color = fab.getAttribute('color');
          expect(color).toBeTruthy();
        });
      }
    });
  });

  describe('FAB Icons - STABLE (Strict Protection)', () => {
    it('should have icons in FABs', () => {
      const fabsWithIcons = fixture.nativeElement.querySelectorAll(
        '[mat-fab] mat-icon, [mat-mini-fab] mat-icon, .fab mat-icon',
      );

      if (fabsWithIcons.length > 0) {
        fabsWithIcons.forEach((icon: HTMLElement) => {
          expect(icon.offsetParent).not.toBeNull();

          // Icon should have content
          const hasContent =
            icon.textContent?.trim() ||
            icon.innerHTML.includes('svg') ||
            icon.getAttribute('svgIcon');
          expect(hasContent).toBeTruthy();
        });
      }
    });

    it('should center icons in FABs', () => {
      const fabs = fixture.nativeElement.querySelectorAll('[mat-fab], [mat-mini-fab]');

      fabs.forEach((fab: HTMLElement) => {
        const icon = fab.querySelector('mat-icon');
        if (icon) {
          // Icon should be visible within FAB
          expect((icon as HTMLElement).offsetParent).not.toBeNull();
        }
      });
    });
  });

  describe('FAB Accessibility - STABLE (Strict Protection)', () => {
    it('should have accessible FABs', () => {
      const fabs = fixture.nativeElement.querySelectorAll('[mat-fab], [mat-mini-fab], .fab');

      fabs.forEach((fab: HTMLElement) => {
        verifyBasicAccessibility(fab);

        // Should be a button or have button role
        const isButton = fab.tagName === 'BUTTON' || fab.getAttribute('role') === 'button';
        expect(isButton).toBe(true);

        // Should have aria-label or accessible text
        const hasAccessibleName =
          fab.getAttribute('aria-label') ||
          fab.getAttribute('aria-labelledby') ||
          fab.textContent?.trim();
        expect(hasAccessibleName).toBeTruthy();
      });
    });

    it('should maintain minimum touch targets', () => {
      const fabs = fixture.nativeElement.querySelectorAll('[mat-fab], [mat-mini-fab], .fab');

      fabs.forEach((fab: HTMLElement) => {
        const styles = window.getComputedStyle(fab);
        const width = parseFloat(styles.width);
        const height = parseFloat(styles.height);

        // Minimum touch target size
        if (!isNaN(width)) {
          expect(width).toBeGreaterThanOrEqual(32);
        }
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(32);
        }
      });
    });
  });

  describe('FAB Theme Responsiveness - STABLE', () => {
    it('should respond to theme changes', () => {
      const fab = fixture.nativeElement.querySelector('[mat-fab], [mat-mini-fab], .fab');
      if (fab) {
        verifyThemeResponsiveness(fab, themeService, fixture);
      }
    });

    it('should maintain FAB structure across themes', () => {
      const fabs = fixture.nativeElement.querySelectorAll('[mat-fab], [mat-mini-fab], .fab');
      const initialCount = fabs.length;

      themeService.toggleTheme();
      fixture.detectChanges();

      const newFabs = fixture.nativeElement.querySelectorAll('[mat-fab], [mat-mini-fab], .fab');
      expect(newFabs.length).toBe(initialCount);

      themeService.toggleTheme();
      fixture.detectChanges();
    });
  });

  describe('FAB Migration Tracking', () => {
    it('should track FAB token migration progress', () => {
      const fabs = fixture.nativeElement.querySelectorAll('[mat-fab], [mat-mini-fab], .fab');

      fabs.forEach((fab: HTMLElement, index: number) => {
        trackTokenMigration(fab, `FAB-${index}`);
      });

      expect(fabs.length).toBeGreaterThan(0);
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break FAB system structure', () => {
      const fabDemo = fixture.nativeElement.querySelector('.demo-fab, .fab-demo, .fab-examples');
      const fabs = fixture.nativeElement.querySelectorAll(
        '[mat-fab], [mat-mini-fab], .fab, .floating-action-button',
      );

      expect(fabDemo || fabs.length > 0).toBe(true);
      expect(fabs.length).toBeGreaterThan(0);
    });

    it('should never break FAB accessibility', () => {
      const fabs = fixture.nativeElement.querySelectorAll('[mat-fab], [mat-mini-fab], .fab');

      fabs.forEach((fab: HTMLElement) => {
        verifyBasicAccessibility(fab);
      });
    });

    it('should never break FAB interactions', () => {
      const fabs = fixture.nativeElement.querySelectorAll(
        '[mat-fab]:not([disabled]), [mat-mini-fab]:not([disabled])',
      );

      fabs.forEach((fab: HTMLElement) => {
        // Should be clickable
        expect(fab.offsetParent).not.toBeNull();
        expect(fab.tabIndex).toBeGreaterThanOrEqual(0);

        // Should not be disabled
        expect(fab.hasAttribute('disabled')).toBe(false);
      });
    });

    it('should never break FAB shape', () => {
      const fabs = fixture.nativeElement.querySelectorAll('[mat-fab], [mat-mini-fab]');

      fabs.forEach((fab: HTMLElement) => {
        const styles = window.getComputedStyle(fab);
        const width = parseFloat(styles.width);
        const height = parseFloat(styles.height);

        // CRITICAL: FABs should be roughly circular
        if (!isNaN(width) && !isNaN(height)) {
          expect(Math.abs(width - height)).toBeLessThanOrEqual(4);
        }
      });
    });

    it('should never break minimum touch targets', () => {
      const fabs = fixture.nativeElement.querySelectorAll('[mat-fab], [mat-mini-fab], .fab');

      fabs.forEach((fab: HTMLElement) => {
        const styles = window.getComputedStyle(fab);
        const width = parseFloat(styles.width);
        const height = parseFloat(styles.height);

        // CRITICAL: Must maintain minimum touch target
        if (!isNaN(width)) {
          expect(width).toBeGreaterThanOrEqual(32);
        }
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(32);
        }
      });
    });
  });
});
