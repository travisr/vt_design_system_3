import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChipsComponent } from './chips.component';
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

  // Chips should be focusable if interactive
  if (element.hasAttribute('tabindex') || element.tagName === 'BUTTON') {
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

describe('Chips System - STABLE (Protected)', () => {
  let _component: ChipsComponent;
  let fixture: ComponentFixture<ChipsComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('Chip Variants - STABLE (Strict Protection)', () => {
    it('should have chip examples', () => {
      const chips = fixture.nativeElement.querySelectorAll(
        'mat-chip, mat-chip-option, .chip, [class*="chip"]',
      );
      expect(chips.length).toBeGreaterThan(0);

      chips.forEach((chip: HTMLElement) => {
        expect(chip.offsetParent).not.toBeNull(); // Chip is visible
      });
    });

    it('should have basic chips', () => {
      const basicChips = fixture.nativeElement.querySelectorAll('mat-chip, .basic-chip, .chip');

      if (basicChips.length > 0) {
        basicChips.forEach((chip: HTMLElement) => {
          expect(chip.offsetParent).not.toBeNull();
          verifyBasicAccessibility(chip);

          // Should have text content
          expect(chip.textContent?.trim()).toBeTruthy();
        });
      }
    });

    it('should have selectable chips', () => {
      const selectableChips = fixture.nativeElement.querySelectorAll(
        'mat-chip-option, .selectable-chip, [class*="selectable"]',
      );

      if (selectableChips.length > 0) {
        selectableChips.forEach((chip: HTMLElement) => {
          expect(chip.offsetParent).not.toBeNull();
          verifyBasicAccessibility(chip);

          // Should be interactive
          expect(chip.tabIndex).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should have removable chips', () => {
      const removableChips = fixture.nativeElement.querySelectorAll(
        'mat-chip[removable], .removable-chip, [class*="removable"]',
      );

      if (removableChips.length > 0) {
        removableChips.forEach((chip: HTMLElement) => {
          expect(chip.offsetParent).not.toBeNull();

          // Should have remove button or icon
          const removeButton = chip.querySelector(
            'button, mat-icon, .remove-icon, [class*="remove"]',
          );
          expect(removeButton).toBeTruthy();
        });
      }
    });

    it('should demonstrate different chip types', () => {
      const chipTypes = [
        'mat-chip',
        'mat-chip-option',
        '.filter-chip',
        '.input-chip',
        '.action-chip',
      ];

      let foundTypes = 0;
      chipTypes.forEach((selector) => {
        const chips = fixture.nativeElement.querySelectorAll(selector);
        if (chips.length > 0) {
          foundTypes++;
        }
      });

      // Should have at least 1 chip type
      expect(foundTypes).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Chip States - STABLE (Strict Protection)', () => {
    it('should handle chip interactions', () => {
      const interactiveChips = fixture.nativeElement.querySelectorAll(
        'mat-chip-option, .selectable-chip, [tabindex]',
      );

      interactiveChips.forEach((chip: HTMLElement) => {
        // Chip should be interactive
        expect(chip.offsetParent).not.toBeNull();
        expect(chip.tabIndex).toBeGreaterThanOrEqual(0);

        // Should have proper styling
        const styles = window.getComputedStyle(chip);
        expect(styles.cursor).not.toBe('not-allowed');
      });
    });

    it('should demonstrate selected states', () => {
      const selectedChips = fixture.nativeElement.querySelectorAll(
        'mat-chip-option[aria-selected="true"], .chip.selected, [class*="selected"]',
      );

      if (selectedChips.length > 0) {
        selectedChips.forEach((chip: HTMLElement) => {
          expect(chip.offsetParent).not.toBeNull();

          // Selected chips should be visually distinct
          const styles = window.getComputedStyle(chip);
          expect(styles.backgroundColor).not.toBe('transparent');
        });
      }
    });

    it('should have accessible chips', () => {
      const chips = fixture.nativeElement.querySelectorAll('mat-chip, mat-chip-option, .chip');

      chips.forEach((chip: HTMLElement) => {
        verifyBasicAccessibility(chip);

        // Should have proper content
        expect(chip.textContent?.trim()).toBeTruthy();
      });
    });

    it('should demonstrate disabled states', () => {
      const disabledChips = fixture.nativeElement.querySelectorAll(
        'mat-chip[disabled], .chip[disabled], [disabled]',
      );

      if (disabledChips.length > 0) {
        disabledChips.forEach((chip: HTMLElement) => {
          expect(chip.hasAttribute('disabled')).toBe(true);

          const styles = window.getComputedStyle(chip);
          expect(styles.cursor).toBe('not-allowed');
        });
      }
    });
  });

  describe('Chip Sets and Lists - STABLE (Strict Protection)', () => {
    it('should have chip sets', () => {
      const chipSets = fixture.nativeElement.querySelectorAll(
        'mat-chip-set, mat-chip-listbox, .chip-set, .chip-list',
      );

      if (chipSets.length > 0) {
        chipSets.forEach((chipSet: HTMLElement) => {
          expect(chipSet.offsetParent).not.toBeNull();

          // Should contain multiple chips
          const chips = chipSet.querySelectorAll('mat-chip, mat-chip-option, .chip');
          expect(chips.length).toBeGreaterThan(0);
        });
      }
    });

    it('should support chip selection in sets', () => {
      const selectableChipSets = fixture.nativeElement.querySelectorAll(
        'mat-chip-listbox, .selectable-chip-set',
      );

      if (selectableChipSets.length > 0) {
        selectableChipSets.forEach((chipSet: HTMLElement) => {
          const selectableChips = chipSet.querySelectorAll('mat-chip-option, .selectable-chip');

          if (selectableChips.length > 0) {
            selectableChips.forEach((chip) => {
              expect((chip as HTMLElement).tabIndex).toBeGreaterThanOrEqual(0);
            });
          }
        });
      }
    });
  });

  describe('Chip Content and Icons - STABLE (Strict Protection)', () => {
    it('should support chips with icons', () => {
      const chipsWithIcons = fixture.nativeElement.querySelectorAll(
        'mat-chip mat-icon, .chip mat-icon, [class*="chip"] mat-icon',
      );

      if (chipsWithIcons.length > 0) {
        chipsWithIcons.forEach((icon: HTMLElement) => {
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

    it('should support chips with avatars', () => {
      const chipsWithAvatars = fixture.nativeElement.querySelectorAll(
        'mat-chip img, .chip img, .chip .avatar',
      );

      if (chipsWithAvatars.length > 0) {
        chipsWithAvatars.forEach((avatar: HTMLElement) => {
          expect(avatar.offsetParent).not.toBeNull();
        });
      }
    });

    it('should have proper chip text content', () => {
      const chips = fixture.nativeElement.querySelectorAll('mat-chip, mat-chip-option, .chip');

      chips.forEach((chip: HTMLElement) => {
        // Each chip should have meaningful text content
        expect(chip.textContent?.trim()).toBeTruthy();
        expect(chip.textContent?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Chip Density - STABLE (Strict Protection)', () => {
    it('should support different chip densities', () => {
      const chips = fixture.nativeElement.querySelectorAll('mat-chip, mat-chip-option, .chip');

      if (chips.length > 1) {
        const heights = Array.from(chips)
          .map((chip) => {
            return parseFloat(window.getComputedStyle(chip as HTMLElement).height);
          })
          .filter((height) => !isNaN(height));

        // Should have reasonable chip heights (OpenAI-style compact)
        heights.forEach((height) => {
          expect(height).toBeGreaterThanOrEqual(16); // OpenAI compact minimum
          expect(height).toBeLessThanOrEqual(60); // Maximum reasonable height
        });
      }
    });

    it('should maintain minimum touch targets for interactive chips', () => {
      const interactiveChips = fixture.nativeElement.querySelectorAll(
        'mat-chip-option, .selectable-chip, [tabindex]',
      );

      interactiveChips.forEach((chip: HTMLElement) => {
        const styles = window.getComputedStyle(chip);
        const height = parseFloat(styles.height);

        // Interactive chips in OpenAI-style compact design
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(16);
        }
      });
    });
  });

  describe('Chip Theme Responsiveness - STABLE', () => {
    it('should respond to theme changes', () => {
      const chip = fixture.nativeElement.querySelector('mat-chip, mat-chip-option, .chip');
      if (chip) {
        verifyThemeResponsiveness(chip, themeService, fixture);
      }
    });

    it('should maintain chip structure across themes', () => {
      const chips = fixture.nativeElement.querySelectorAll('mat-chip, mat-chip-option, .chip');
      const initialCount = chips.length;

      themeService.toggleTheme();
      fixture.detectChanges();

      const newChips = fixture.nativeElement.querySelectorAll('mat-chip, mat-chip-option, .chip');
      expect(newChips.length).toBe(initialCount);

      themeService.toggleTheme();
      fixture.detectChanges();
    });
  });

  describe('Chip Migration Tracking', () => {
    it('should track chip token migration progress', () => {
      const chips = fixture.nativeElement.querySelectorAll('mat-chip, mat-chip-option, .chip');

      chips.forEach((chip: HTMLElement, index: number) => {
        trackTokenMigration(chip, `Chip-${index}`);
      });

      expect(chips.length).toBeGreaterThan(0);
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break chip system structure', () => {
      const chipDemo = fixture.nativeElement.querySelector(
        '.demo-chips, .chips-demo, .chip-examples',
      );
      const chips = fixture.nativeElement.querySelectorAll(
        'mat-chip, mat-chip-option, .chip, [class*="chip"]',
      );

      expect(chipDemo || chips.length > 0).toBe(true);
      expect(chips.length).toBeGreaterThan(0);
    });

    it('should never break chip accessibility', () => {
      const chips = fixture.nativeElement.querySelectorAll('mat-chip, mat-chip-option, .chip');

      chips.forEach((chip: HTMLElement) => {
        verifyBasicAccessibility(chip);
      });
    });

    it('should never break chip content', () => {
      const chips = fixture.nativeElement.querySelectorAll('mat-chip, mat-chip-option, .chip');

      chips.forEach((chip: HTMLElement) => {
        // CRITICAL: Chips must have content
        expect(chip.textContent?.trim()).toBeTruthy();
      });
    });

    it('should never break interactive chip functionality', () => {
      const interactiveChips = fixture.nativeElement.querySelectorAll(
        'mat-chip-option:not([disabled]), .selectable-chip:not([disabled])',
      );

      interactiveChips.forEach((chip: HTMLElement) => {
        // Should be interactive
        expect(chip.offsetParent).not.toBeNull();
        expect(chip.tabIndex).toBeGreaterThanOrEqual(0);

        // Should not be disabled
        expect(chip.hasAttribute('disabled')).toBe(false);
      });
    });

    it('should never break minimum touch targets', () => {
      const interactiveChips = fixture.nativeElement.querySelectorAll(
        'mat-chip-option, .selectable-chip, [tabindex]',
      );

      interactiveChips.forEach((chip: HTMLElement) => {
        const styles = window.getComputedStyle(chip);
        const height = parseFloat(styles.height);

        // CRITICAL: Interactive chips must maintain OpenAI-style compact design
        if (!isNaN(height)) {
          expect(height).toBeGreaterThanOrEqual(16);
        }
      });
    });

    it('should never break chip removal functionality', () => {
      const removableChips = fixture.nativeElement.querySelectorAll(
        'mat-chip[removable], .removable-chip',
      );

      removableChips.forEach((chip: HTMLElement) => {
        const removeButton = chip.querySelector('button, .remove-button, [class*="remove"]');

        // CRITICAL: Removable chips must have remove functionality
        if (chip.hasAttribute('removable') || chip.classList.contains('removable-chip')) {
          expect(removeButton).toBeTruthy();
        }
      });
    });
  });
});
