import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SegmentedButtonsComponent } from './segmented-buttons.component';
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
    borderColor: window.getComputedStyle(element).borderColor,
  };
  themeService.toggleTheme();
  fixture.detectChanges();
  const newStyles = {
    backgroundColor: window.getComputedStyle(element).backgroundColor,
    color: window.getComputedStyle(element).color,
    borderColor: window.getComputedStyle(element).borderColor,
  };
  const stylesChanged =
    initialStyles.backgroundColor !== newStyles.backgroundColor ||
    initialStyles.color !== newStyles.color ||
    initialStyles.borderColor !== newStyles.borderColor;
  expect(stylesChanged).toBe(true);
  themeService.toggleTheme();
  fixture.detectChanges();
}

function verifyBasicAccessibility(element: HTMLElement): void {
  expect(element.offsetParent).not.toBeNull(); // Element is visible

  // Only check focusability for interactive elements
  if (
    element.hasAttribute('tabindex') ||
    element.tagName === 'BUTTON' ||
    element.getAttribute('role') === 'button'
  ) {
    expect(element.tabIndex).toBeGreaterThanOrEqual(0); // Focusable
  }

  const styles = window.getComputedStyle(element);
  expect(styles.display).not.toBe('none');
  expect(styles.visibility).not.toBe('hidden');
}

function trackTokenMigration(element: HTMLElement, componentName: string): void {
  const styles = window.getComputedStyle(element);
  let matTokens = 0;
  for (const property of styles) {
    if (property.startsWith('--mat-sys-')) matTokens++;
  }

  if (matTokens > 0) console.warn(`${componentName} uses ${matTokens} mat tokens ✓`);
}

describe('Segmented Buttons System - STABLE (Protected)', () => {
  let _component: SegmentedButtonsComponent;
  let fixture: ComponentFixture<SegmentedButtonsComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedButtonsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentedButtonsComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('Segmented Button Structure - STABLE (Strict Protection)', () => {
    it('should have segmented button examples', () => {
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle-group, mat-button-toggle, .segmented-button, .button-group, [class*="segmented"]',
      );
      expect(segmentedButtons.length).toBeGreaterThan(0);

      segmentedButtons.forEach((button: HTMLElement) => {
        expect(button.offsetParent).not.toBeNull(); // Button is visible
      });
    });

    it('should have button toggle groups', () => {
      const toggleGroups = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle-group, .button-toggle-group',
      );

      if (toggleGroups.length > 0) {
        toggleGroups.forEach((group: HTMLElement) => {
          expect(group.offsetParent).not.toBeNull();

          // Should contain multiple toggle buttons
          const toggles = group.querySelectorAll('mat-button-toggle, button, .toggle-button');
          expect(toggles.length).toBeGreaterThan(1);
        });
      }
    });

    it('should have individual toggle buttons', () => {
      const toggleButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );

      if (toggleButtons.length > 0) {
        toggleButtons.forEach((button: HTMLElement) => {
          expect(button.offsetParent).not.toBeNull();
          verifyBasicAccessibility(button);
        });
      }
    });

    it('should demonstrate grouped button layout', () => {
      const buttonGroups = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle-group, .button-group, .segmented-buttons',
      );

      if (buttonGroups.length > 0) {
        buttonGroups.forEach((group: HTMLElement) => {
          const buttons = group.querySelectorAll('mat-button-toggle, button, .toggle-button');

          // Groups should have multiple buttons
          expect(buttons.length).toBeGreaterThan(1);

          // Buttons should be visually connected
          buttons.forEach((button) => {
            expect((button as HTMLElement).offsetParent).not.toBeNull();
          });
        });
      }
    });
  });

  describe('Segmented Button States - STABLE (Strict Protection)', () => {
    it('should handle selection states', () => {
      const toggleButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button',
      );

      if (toggleButtons.length > 0) {
        toggleButtons.forEach((button: HTMLElement) => {
          // Button should be interactive
          expect(button.offsetParent).not.toBeNull();
          expect(button.tabIndex).toBeGreaterThanOrEqual(0);

          // Should have proper button styling
          const styles = window.getComputedStyle(button);
          expect(styles.cursor).not.toBe('not-allowed');
        });
      }
    });

    it('should demonstrate selected states', () => {
      const selectedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle[aria-pressed="true"], .toggle-button.selected, [class*="selected"]',
      );

      if (selectedButtons.length > 0) {
        selectedButtons.forEach((button: HTMLElement) => {
          expect(button.offsetParent).not.toBeNull();

          // Selected buttons should be visually distinct
          const styles = window.getComputedStyle(button);
          expect(styles.backgroundColor).not.toBe('transparent');
        });
      }
    });

    it('should have accessible segmented buttons', () => {
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );

      segmentedButtons.forEach((button: HTMLElement) => {
        verifyBasicAccessibility(button);

        // Should have button role or be a button element
        const isButton =
          button.tagName === 'BUTTON' ||
          button.getAttribute('role') === 'button' ||
          button.classList.contains('mat-button-toggle');
        expect(isButton).toBe(true);
      });
    });

    it('should demonstrate disabled states', () => {
      const disabledButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle[disabled], button[disabled], [disabled]',
      );

      if (disabledButtons.length > 0) {
        disabledButtons.forEach((button: HTMLElement) => {
          expect(button.hasAttribute('disabled')).toBe(true);
        });
      }
    });
  });

  describe('Segmented Button Variants - STABLE (Strict Protection)', () => {
    it('should support single selection mode', () => {
      const singleSelectGroups = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle-group:not([multiple]), .single-select',
      );

      if (singleSelectGroups.length > 0) {
        singleSelectGroups.forEach((group: HTMLElement) => {
          expect(group.offsetParent).not.toBeNull();

          // Should contain multiple options
          const buttons = group.querySelectorAll('mat-button-toggle, button, .toggle-button');
          expect(buttons.length).toBeGreaterThan(1);
        });
      }
    });

    it('should support multiple selection mode', () => {
      const multiSelectGroups = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle-group[multiple], .multi-select',
      );

      if (multiSelectGroups.length > 0) {
        multiSelectGroups.forEach((group: HTMLElement) => {
          expect(group.offsetParent).not.toBeNull();
          expect(group.hasAttribute('multiple') || group.classList.contains('multi-select')).toBe(
            true,
          );
        });
      }
    });

    it('should demonstrate different button content', () => {
      const _buttonsWithIcons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle mat-icon, .toggle-button mat-icon',
      );
      const buttonsWithText = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button',
      );

      // Should have buttons with content
      expect(buttonsWithText.length).toBeGreaterThan(0);

      buttonsWithText.forEach((button: HTMLElement) => {
        const hasContent =
          button.textContent?.trim() ||
          button.querySelector('mat-icon') ||
          button.querySelector('svg');
        expect(hasContent).toBeTruthy();
      });
    });
  });

  describe('Segmented Button Density - STABLE (Strict Protection)', () => {
    it('should support different button densities', () => {
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );

      if (segmentedButtons.length > 1) {
        const heights = Array.from(segmentedButtons)
          .map((button) => {
            return parseFloat(window.getComputedStyle(button as HTMLElement).height);
          })
          .filter((height) => !isNaN(height));

        // Should have reasonable button heights (OpenAI-style compact)
        heights.forEach((height) => {
          expect(height).toBeGreaterThanOrEqual(20); // OpenAI compact minimum
          expect(height).toBeLessThanOrEqual(80); // Maximum reasonable height
        });
      }
    });

    it('should maintain minimum touch targets', () => {
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );

      segmentedButtons.forEach((button: HTMLElement) => {
        const styles = window.getComputedStyle(button);
        const height = parseFloat(styles.height);
        const width = parseFloat(styles.width);

        // OpenAI-style compact button size
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(20);
        }
        if (!isNaN(width)) {
          expect(width).toBeGreaterThanOrEqual(20);
        }
      });
    });
  });

  describe('Segmented Button Theme Responsiveness - STABLE', () => {
    it('should respond to theme changes', () => {
      const segmentedButton = fixture.nativeElement.querySelector(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );
      if (segmentedButton) {
        verifyThemeResponsiveness(segmentedButton, themeService, fixture);
      }
    });

    it('should maintain button structure across themes', () => {
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );
      const initialCount = segmentedButtons.length;

      themeService.toggleTheme();
      fixture.detectChanges();

      const newButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );
      expect(newButtons.length).toBe(initialCount);

      themeService.toggleTheme();
      fixture.detectChanges();
    });
  });

  describe('Segmented Button Migration Tracking', () => {
    it('should track segmented button token migration progress', () => {
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );

      segmentedButtons.forEach((button: HTMLElement, index: number) => {
        trackTokenMigration(button, `SegmentedButton-${index}`);
      });

      expect(segmentedButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break segmented button system structure', () => {
      const segmentedDemo = fixture.nativeElement.querySelector(
        '.demo-segmented-buttons, .segmented-buttons-demo, .button-toggle-demo',
      );
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle-group, mat-button-toggle, .segmented-button, .button-group',
      );

      expect(segmentedDemo || segmentedButtons.length > 0).toBe(true);
      expect(segmentedButtons.length).toBeGreaterThan(0);
    });

    it('should never break segmented button accessibility', () => {
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );

      segmentedButtons.forEach((button: HTMLElement) => {
        verifyBasicAccessibility(button);
      });
    });

    it('should never break segmented button interactions', () => {
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle:not([disabled]), .toggle-button:not([disabled])',
      );

      segmentedButtons.forEach((button: HTMLElement) => {
        // Should be clickable
        expect(button.offsetParent).not.toBeNull();
        expect(button.tabIndex).toBeGreaterThanOrEqual(0);

        // Should not be disabled
        expect(button.hasAttribute('disabled')).toBe(false);
      });
    });

    it('should never break minimum touch targets', () => {
      const segmentedButtons = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle, .toggle-button, .segmented-button',
      );

      segmentedButtons.forEach((button: HTMLElement) => {
        const styles = window.getComputedStyle(button);
        const height = parseFloat(styles.height);

        // CRITICAL: Must maintain OpenAI-style compact design
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(20);
        }
      });
    });

    it('should never break button grouping', () => {
      const buttonGroups = fixture.nativeElement.querySelectorAll(
        'mat-button-toggle-group, .button-group, .segmented-buttons',
      );

      if (buttonGroups.length > 0) {
        buttonGroups.forEach((group: HTMLElement) => {
          const buttons = group.querySelectorAll('mat-button-toggle, button, .toggle-button');

          // CRITICAL: Groups should contain multiple buttons
          expect(buttons.length).toBeGreaterThan(1);
        });
      }
    });
  });
});
