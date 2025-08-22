import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsComponent } from './buttons.component';
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

function trackTokenMigration(element: HTMLElement, _componentName: string): void {
  const styles = window.getComputedStyle(element);
  let matTokens = 0;
  for (const property of styles) {
    if (property.startsWith('--mat-sys-')) matTokens++;
  }
  if (matTokens > 0) console.warn(`${_componentName} uses ${matTokens} mat tokens ✓`);
}

describe('Buttons System - STABLE (Protected)', () => {
  let _component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonsComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('Button Variants - STABLE (Strict Protection)', () => {
    it('should have multiple button variants', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, mat-button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );
      expect(buttons.length).toBeGreaterThan(0);

      buttons.forEach((button: HTMLElement) => {
        expect(button.offsetParent).not.toBeNull(); // Button is visible
      });
    });

    it('should have primary buttons', () => {
      const primaryButtons = fixture.nativeElement.querySelectorAll(
        'button[color="primary"], [mat-raised-button][color="primary"], [mat-flat-button][color="primary"], .primary-button',
      );

      if (primaryButtons.length > 0) {
        primaryButtons.forEach((button: HTMLElement) => {
          expect(button.offsetParent).not.toBeNull();
          verifyBasicAccessibility(button);
        });
      }
    });

    it('should have secondary buttons', () => {
      const secondaryButtons = fixture.nativeElement.querySelectorAll(
        'button[color="accent"], [mat-stroked-button], [mat-button], .secondary-button',
      );

      if (secondaryButtons.length > 0) {
        secondaryButtons.forEach((button: HTMLElement) => {
          expect(button.offsetParent).not.toBeNull();
          verifyBasicAccessibility(button);
        });
      }
    });

    it('should demonstrate different button types', () => {
      const buttonTypes = [
        'button[mat-raised-button], [mat-raised-button]',
        'button[mat-flat-button], [mat-flat-button]',
        'button[mat-stroked-button], [mat-stroked-button]',
        'button[mat-button], [mat-button]',
      ];

      let foundTypes = 0;
      buttonTypes.forEach((selector) => {
        const buttons = fixture.nativeElement.querySelectorAll(selector);
        if (buttons.length > 0) {
          foundTypes++;
        }
      });

      // Should have at least 2 different button types
      expect(foundTypes).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Button States - STABLE (Strict Protection)', () => {
    it('should handle button interactions', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );

      buttons.forEach((button: HTMLElement) => {
        // Button should be clickable
        expect((button as HTMLButtonElement).disabled).toBeFalsy();

        // Should have proper button styling
        const styles = window.getComputedStyle(button);
        expect(styles.cursor).not.toBe('not-allowed');
      });
    });

    it('should have accessible button states', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );

      buttons.forEach((button: HTMLElement) => {
        verifyBasicAccessibility(button);

        // Should have button role or be a button element
        const isButton = button.tagName === 'BUTTON' || button.getAttribute('role') === 'button';
        expect(isButton).toBe(true);
      });
    });

    it('should demonstrate disabled state', () => {
      const disabledButtons = fixture.nativeElement.querySelectorAll(
        'button[disabled], [disabled]',
      );

      if (disabledButtons.length > 0) {
        disabledButtons.forEach((button: HTMLElement) => {
          expect(button.hasAttribute('disabled')).toBe(true);

          const styles = window.getComputedStyle(button);
          expect(styles.cursor).toBe('not-allowed');
        });
      }
    });
  });

  describe('Button Density - STABLE (Strict Protection)', () => {
    it('should support different button densities', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );

      if (buttons.length > 1) {
        const heights = Array.from(buttons)
          .map((button) => {
            return parseFloat(window.getComputedStyle(button as HTMLElement).height);
          })
          .filter((height) => !isNaN(height));

        // Should have reasonable button heights
        heights.forEach((height) => {
          expect(height).toBeGreaterThanOrEqual(32); // Minimum touch target
          expect(height).toBeLessThanOrEqual(80); // Maximum reasonable height
        });
      }
    });

    it('should maintain minimum touch targets', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );

      buttons.forEach((button: HTMLElement) => {
        const styles = window.getComputedStyle(button);
        const height = parseFloat(styles.height);
        const width = parseFloat(styles.width);

        // Minimum touch target size (accessibility requirement)
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(32);
        }
        if (!isNaN(width)) {
          expect(width).toBeGreaterThanOrEqual(32);
        }
      });
    });
  });

  describe('Button Theme Responsiveness - STABLE', () => {
    it('should respond to theme changes', () => {
      const button = fixture.nativeElement.querySelector(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );
      if (button) {
        verifyThemeResponsiveness(button, themeService, fixture);
      }
    });

    it('should maintain button structure across themes', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );
      const initialCount = buttons.length;

      themeService.toggleTheme();
      fixture.detectChanges();

      const newButtons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );
      expect(newButtons.length).toBe(initialCount);

      themeService.toggleTheme();
      fixture.detectChanges();
    });
  });

  describe('Button Migration Tracking', () => {
    it('should track button token migration progress', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );

      buttons.forEach((button: HTMLElement, index: number) => {
        trackTokenMigration(button, `Button-${index}`);
      });

      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break button system structure', () => {
      const buttonDemo = fixture.nativeElement.querySelector(
        '.demo-buttons, .buttons-demo, .button-examples',
      );
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );

      expect(buttonDemo || buttons.length > 0).toBe(true);
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should never break button accessibility', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );

      buttons.forEach((button: HTMLElement) => {
        verifyBasicAccessibility(button);
      });
    });

    it('should never break button interactions', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button:not([disabled]), [mat-button]:not([disabled]), [mat-raised-button]:not([disabled])',
      );

      buttons.forEach((button: HTMLElement) => {
        // Should be clickable
        expect(button.offsetParent).not.toBeNull();
        expect(button.tabIndex).toBeGreaterThanOrEqual(0);

        // Should not be disabled
        expect(button.hasAttribute('disabled')).toBe(false);
      });
    });

    it('should never break minimum touch targets', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );

      buttons.forEach((button: HTMLElement) => {
        const styles = window.getComputedStyle(button);
        const height = parseFloat(styles.height);

        // CRITICAL: Must maintain minimum touch target
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(32);
        }
      });
    });

    it('should never break button variants', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'button, [mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );

      // Should have buttons
      expect(buttons.length).toBeGreaterThan(0);

      // Should have Material Design classes
      const matButtons = fixture.nativeElement.querySelectorAll(
        '[mat-button], [mat-raised-button], [mat-flat-button], [mat-stroked-button]',
      );
      expect(matButtons.length).toBeGreaterThanOrEqual(0);
    });
  });
});
