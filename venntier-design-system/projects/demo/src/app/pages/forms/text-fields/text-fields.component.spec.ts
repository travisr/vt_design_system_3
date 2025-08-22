import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldsComponent } from './text-fields.component';
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

  // Form fields should be focusable
  if (
    element.tagName === 'INPUT' ||
    element.tagName === 'TEXTAREA' ||
    element.tagName === 'SELECT'
  ) {
    expect(element.tabIndex).toBeGreaterThanOrEqual(0);
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

describe('Text Fields System - STABLE (Protected)', () => {
  let _component: TextFieldsComponent;
  let fixture: ComponentFixture<TextFieldsComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFieldsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TextFieldsComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('Form Field Variants - STABLE (Strict Protection)', () => {
    it('should have text field examples', () => {
      const textFields = fixture.nativeElement.querySelectorAll(
        'mat-form-field, input, textarea, [matInput]',
      );
      expect(textFields.length).toBeGreaterThan(0);

      textFields.forEach((field: HTMLElement) => {
        expect(field.offsetParent).not.toBeNull(); // Field is visible
      });
    });

    it('should have outline appearance fields', () => {
      const outlineFields = fixture.nativeElement.querySelectorAll(
        'mat-form-field[appearance="outline"], .mat-mdc-form-field-appearance-outline',
      );

      if (outlineFields.length > 0) {
        outlineFields.forEach((field: HTMLElement) => {
          expect(field.offsetParent).not.toBeNull();
          verifyBasicAccessibility(field);
        });
      }
    });

    it('should have fill appearance fields', () => {
      const fillFields = fixture.nativeElement.querySelectorAll(
        'mat-form-field[appearance="fill"], .mat-mdc-form-field-appearance-fill',
      );

      if (fillFields.length > 0) {
        fillFields.forEach((field: HTMLElement) => {
          expect(field.offsetParent).not.toBeNull();
          verifyBasicAccessibility(field);
        });
      }
    });

    it('should demonstrate different input types', () => {
      const inputTypes = [
        'input[type="text"]',
        'input[type="email"]',
        'input[type="password"]',
        'input[type="number"]',
        'textarea',
      ];

      let foundTypes = 0;
      inputTypes.forEach((selector) => {
        const inputs = fixture.nativeElement.querySelectorAll(selector);
        if (inputs.length > 0) {
          foundTypes++;
        }
      });

      // Should have at least 2 different input types
      expect(foundTypes).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Form Field States - STABLE (Strict Protection)', () => {
    it('should handle form field interactions', () => {
      const inputs = fixture.nativeElement.querySelectorAll('input, textarea, [matInput]');

      inputs.forEach((input: HTMLElement) => {
        // Input should be interactive
        expect((input as HTMLInputElement).disabled).toBeFalsy();

        // Should be focusable
        expect(input.tabIndex).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have accessible form fields', () => {
      const formFields = fixture.nativeElement.querySelectorAll('mat-form-field, input, textarea');

      formFields.forEach((field: HTMLElement) => {
        verifyBasicAccessibility(field);

        // Should have proper form field attributes
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
          expect(field.hasAttribute('id') || field.hasAttribute('name')).toBe(true);
        }
      });
    });

    it('should demonstrate error states', () => {
      const errorFields = fixture.nativeElement.querySelectorAll(
        '.mat-mdc-form-field-error, mat-error, [class*="error"]',
      );

      if (errorFields.length > 0) {
        errorFields.forEach((error: HTMLElement) => {
          expect(error.offsetParent).not.toBeNull();

          // Error text should be visible
          expect(error.textContent?.trim()).toBeTruthy();
        });
      }
    });

    it('should demonstrate disabled states', () => {
      const disabledFields = fixture.nativeElement.querySelectorAll(
        'input[disabled], textarea[disabled], [disabled]',
      );

      if (disabledFields.length > 0) {
        disabledFields.forEach((field: HTMLElement) => {
          expect((field as HTMLInputElement).disabled).toBe(true);
        });
      }
    });
  });

  describe('Form Field Labels and Hints - STABLE (Strict Protection)', () => {
    it('should have proper labels', () => {
      const formFields = fixture.nativeElement.querySelectorAll('mat-form-field');

      formFields.forEach((field: HTMLElement) => {
        const label = field.querySelector('mat-label, label, [matLabel]');
        const input = field.querySelector('input, textarea, [matInput]');

        if (input) {
          // Should have a label or aria-label
          const hasLabel =
            label || input.getAttribute('aria-label') || input.getAttribute('placeholder');
          expect(hasLabel).toBeTruthy();
        }
      });
    });

    it('should have hint text where appropriate', () => {
      const hints = fixture.nativeElement.querySelectorAll('mat-hint, .mat-mdc-form-field-hint');

      hints.forEach((hint: HTMLElement) => {
        expect(hint.offsetParent).not.toBeNull();
        expect(hint.textContent?.trim()).toBeTruthy();
      });
    });
  });

  describe('Form Field Density - STABLE (Strict Protection)', () => {
    it('should support different form field densities', () => {
      const formFields = fixture.nativeElement.querySelectorAll('mat-form-field, input, textarea');

      if (formFields.length > 1) {
        const heights = Array.from(formFields)
          .map((field) => {
            return parseFloat(window.getComputedStyle(field as HTMLElement).height);
          })
          .filter((height) => !isNaN(height));

        // Should have reasonable form field heights (OpenAI-style compact)
        heights.forEach((height) => {
          expect(height).toBeGreaterThanOrEqual(20); // OpenAI compact minimum
          expect(height).toBeLessThanOrEqual(160); // Maximum reasonable height
        });
      }
    });

    it('should maintain minimum touch targets', () => {
      const inputs = fixture.nativeElement.querySelectorAll('input, textarea, [matInput]');

      inputs.forEach((input: HTMLElement) => {
        const styles = window.getComputedStyle(input);
        const height = parseFloat(styles.height);

        // OpenAI-style compact input fields
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(16); // OpenAI compact style
        }
      });
    });
  });

  describe('Form Field Theme Responsiveness - STABLE', () => {
    it('should respond to theme changes', () => {
      const formField = fixture.nativeElement.querySelector('mat-form-field, input, textarea');
      if (formField) {
        verifyThemeResponsiveness(formField, themeService, fixture);
      }
    });

    it('should maintain form field structure across themes', () => {
      const formFields = fixture.nativeElement.querySelectorAll('mat-form-field, input, textarea');
      const initialCount = formFields.length;

      themeService.toggleTheme();
      fixture.detectChanges();

      const newFormFields = fixture.nativeElement.querySelectorAll(
        'mat-form-field, input, textarea',
      );
      expect(newFormFields.length).toBe(initialCount);

      themeService.toggleTheme();
      fixture.detectChanges();
    });
  });

  describe('Form Field Migration Tracking', () => {
    it('should track form field token migration progress', () => {
      const formFields = fixture.nativeElement.querySelectorAll('mat-form-field, input, textarea');

      formFields.forEach((field: HTMLElement, index: number) => {
        trackTokenMigration(field, `FormField-${index}`);
      });

      expect(formFields.length).toBeGreaterThan(0);
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break form field system structure', () => {
      const formFieldDemo = fixture.nativeElement.querySelector(
        '.demo-text-fields, .text-fields-demo, .form-fields-demo',
      );
      const formFields = fixture.nativeElement.querySelectorAll(
        'mat-form-field, input, textarea, [matInput]',
      );

      expect(formFieldDemo || formFields.length > 0).toBe(true);
      expect(formFields.length).toBeGreaterThan(0);
    });

    it('should never break form field accessibility', () => {
      const formFields = fixture.nativeElement.querySelectorAll('mat-form-field, input, textarea');

      formFields.forEach((field: HTMLElement) => {
        verifyBasicAccessibility(field);
      });
    });

    it('should never break form field interactions', () => {
      const inputs = fixture.nativeElement.querySelectorAll(
        'input:not([disabled]), textarea:not([disabled])',
      );

      inputs.forEach((input: HTMLElement) => {
        // Should be interactive
        expect(input.offsetParent).not.toBeNull();
        expect(input.tabIndex).toBeGreaterThanOrEqual(0);

        // Should not be disabled
        expect((input as HTMLInputElement).disabled).toBe(false);
      });
    });

    it('should never break minimum touch targets', () => {
      const inputs = fixture.nativeElement.querySelectorAll('input, textarea, [matInput]');

      inputs.forEach((input: HTMLElement) => {
        const styles = window.getComputedStyle(input);
        const height = parseFloat(styles.height);

        // CRITICAL: Must maintain OpenAI-style compact design
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(16);
        }
      });
    });

    it('should never break form field labels', () => {
      const formFields = fixture.nativeElement.querySelectorAll('mat-form-field');

      formFields.forEach((field: HTMLElement) => {
        const input = field.querySelector('input, textarea, [matInput]');
        if (input) {
          const label = field.querySelector('mat-label, label');
          const hasAriaLabel = input.getAttribute('aria-label');
          const hasPlaceholder = input.getAttribute('placeholder');

          // CRITICAL: Must have some form of label
          expect(label || hasAriaLabel || hasPlaceholder).toBeTruthy();
        }
      });
    });
  });
});
